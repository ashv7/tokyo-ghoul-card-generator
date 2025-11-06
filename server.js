const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 8888;
const JWT_SECRET = process.env.JWT_SECRET || 'tokyo-ghoul-secret-key-change-in-production';
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read users from file
async function readUsers() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write users to file
async function writeUsers(users) {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Verify JWT token middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Auth endpoint
app.post('/.netlify/functions/auth', async (req, res) => {
  try {
    const { action, email, password, username } = req.body;
    const users = await readUsers();

    // REGISTER
    if (action === 'register') {
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: Date.now().toString(),
        email,
        username: username || email.split('@')[0],
        password: hashedPassword,
        cards: [],
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await writeUsers(users);

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
        },
      });
    }

    // LOGIN
    if (action === 'login') {
      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      });
    }

    // VERIFY TOKEN
    if (action === 'verify') {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = users.find(u => u.id === decoded.id);

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      return res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Cards endpoints
app.get('/.netlify/functions/cards', verifyToken, async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.id === req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ cards: user.cards || [] });
  } catch (error) {
    console.error('Get cards error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/.netlify/functions/cards', verifyToken, async (req, res) => {
  try {
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === req.userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!users[userIndex].cards) {
      users[userIndex].cards = [];
    }

    const newCard = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    users[userIndex].cards.push(newCard);
    await writeUsers(users);

    return res.json({ card: newCard });
  } catch (error) {
    console.error('Save card error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/.netlify/functions/cards', verifyToken, async (req, res) => {
  try {
    const { cardId } = req.body;
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === req.userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!users[userIndex].cards) {
      users[userIndex].cards = [];
    }

    users[userIndex].cards = users[userIndex].cards.filter(c => c.id !== cardId);
    await writeUsers(users);

    return res.json({ success: true });
  } catch (error) {
    console.error('Delete card error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 Functions available at http://localhost:${PORT}/.netlify/functions/*`);
});
