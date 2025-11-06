const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const JWT_SECRET = process.env.JWT_SECRET || 'tokyo-ghoul-secret-key-change-in-production';
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
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

// Verify JWT token
function verifyToken(authHeader) {
  if (!authHeader) {
    throw new Error('No token provided');
  }
  const token = authHeader.replace('Bearer ', '');
  return jwt.verify(token, JWT_SECRET);
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const decoded = verifyToken(event.headers.authorization);
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === decoded.id);

    if (userIndex === -1) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    // GET - Retrieve user's cards
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ cards: users[userIndex].cards || [] }),
      };
    }

    // POST - Save a new card
    if (event.httpMethod === 'POST') {
      const card = JSON.parse(event.body);
      
      if (!users[userIndex].cards) {
        users[userIndex].cards = [];
      }

      // Add card with timestamp
      const newCard = {
        ...card,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      users[userIndex].cards.push(newCard);
      await writeUsers(users);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ card: newCard }),
      };
    }

    // DELETE - Remove a card
    if (event.httpMethod === 'DELETE') {
      const { cardId } = JSON.parse(event.body);
      
      if (!users[userIndex].cards) {
        users[userIndex].cards = [];
      }

      users[userIndex].cards = users[userIndex].cards.filter(
        c => c.id !== cardId
      );
      await writeUsers(users);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Cards error:', error);
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }
};
