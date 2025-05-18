import db from '../db.js';

export const getTrades = (req, res) => {
  db.query('SELECT * FROM trades', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const createTrade = (req, res) => {
  const { trade_name } = req.body;
  db.query('INSERT INTO trades (trade_name) VALUES (?)', [trade_name], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Trade created' });
  });
};

export const updateTrade = (req, res) => {
  const { trade_name } = req.body;
  const { id } = req.params;
  db.query('UPDATE trades SET trade_name = ? WHERE trade_id = ?', [trade_name, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Trade updated' });
  });
};

export const deleteTrade = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM trades WHERE trade_id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Trade deleted' });
  });
};
