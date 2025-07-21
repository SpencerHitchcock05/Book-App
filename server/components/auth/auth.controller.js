import db from '../../db/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const { username, password } = req.body;
  try {
    //add check for if user exists
    const hashed = await bcrypt.hash(password, 10);
    await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);
    res.status(201).json({ status: 'SUCCESSFUL' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (!user) return res.status(401).json({ status: 401, error: 'Invalid username or password' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ status: 401, error: 'Invalid username or password' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ status: 200, token, user: {id: user.id, username: user.username} });
  } catch (err) {
    res.status(500).json({ status: 500, details: err.message });
  }
}

export function logout(req, res) {
  // JWT logout is handled on the client
  res.json({ status: 'SUCCESSFUL' });
}

export function refresh(req, res) {
  
}
