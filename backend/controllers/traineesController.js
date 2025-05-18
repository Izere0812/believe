import db from '../db.js';

export const getTrainees = (req, res) => {
  const q = `
    SELECT t.*, tr.trade_name 
    FROM trainees t 
    LEFT JOIN trades tr ON t.trade_id = tr.trade_id
  `;
  db.query(q, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getTraineeById = (req, res) => {
  const { id } = req.params;
  const q = 'SELECT * FROM trainees WHERE trainee_id = ?';
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Trainee not found' });
    res.json(result[0]);
  });
};

export const createTrainee = (req, res) => {
  const { first_names, last_name, gender, trade_id } = req.body;
  const q = `
    INSERT INTO trainees (first_names, last_name, gender, trade_id)
    VALUES (?, ?, ?, ?)
  `;
  db.query(q, [first_names, last_name, gender, trade_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Trainee added successfully' });
  });
};

export const updateTrainee = (req, res) => {
  const { first_names, last_name, gender, trade_id } = req.body;
  const { id } = req.params;
  const q = `
    UPDATE trainees 
    SET first_names = ?, last_name = ?, gender = ?, trade_id = ?
    WHERE trainee_id = ?
  `;
  db.query(q, [first_names, last_name, gender, trade_id, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Trainee updated successfully' });
  });
};

export const deleteTrainee = (req, res) => {
  const { id } = req.params;
  const q = 'DELETE FROM trainees WHERE trainee_id = ?';
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Trainee deleted successfully' });
  });
};
