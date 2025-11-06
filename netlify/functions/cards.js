const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tokyo-ghoul-secret-key-change-in-production';

// Simple in-memory storage (shared with auth function via external users array)
// In production, this should use MongoDB
const userCards = new Map();

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
    const userId = decoded.id;

    // Initialize user's cards if not exists
    if (!userCards.has(userId)) {
      userCards.set(userId, []);
    }

    // GET - Retrieve user's cards
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ cards: userCards.get(userId) || [] }),
      };
    }

    // POST - Save a new card
    if (event.httpMethod === 'POST') {
      const card = JSON.parse(event.body);

      // Add card with timestamp
      const newCard = {
        ...card,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      const cards = userCards.get(userId);
      cards.push(newCard);
      userCards.set(userId, cards);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ card: newCard }),
      };
    }

    // DELETE - Remove a card
    if (event.httpMethod === 'DELETE') {
      const { cardId } = JSON.parse(event.body);

      const cards = userCards.get(userId).filter(c => c.id !== cardId);
      userCards.set(userId, cards);

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
