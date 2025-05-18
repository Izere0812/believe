import express from 'express';
import db from '../db.js';

const router = express.Router();

// Fetch all marks
router.get('/', (req, res) => {
  const q = 'SELECT * FROM marks';
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(data);
  });
});

// Add new marks
router.post('/', (req, res) => {
  const { trainee_id, module_id, marks } = req.body;
  const q = 'INSERT INTO marks (trainee_id, module_id, marks) VALUES (?, ?, ?)';
  db.query(q, [trainee_id, module_id, marks], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Marks added successfully' });
  });
});

// Update marks
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { marks } = req.body;
  const q = 'UPDATE marks SET marks = ? WHERE id = ?';
  db.query(q, [marks, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Marks not found' });
    }
    res.status(200).json({ message: 'Marks updated successfully' });
  });
});

// Delete marks
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const q = 'DELETE FROM marks WHERE id = ?';
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Marks not found' });
    }
    res.status(200).json({ message: 'Marks deleted successfully' });
  });
});

export default router;
