import db from '../db.js';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const q = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(q, [username, hash], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'User registered successfully' });
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;
  const q = 'SELECT * FROM users WHERE username = ?';
  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = data[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.user_id }, 'secretkey');
    res.json({ token, userId: user.user_id });
  });
};
