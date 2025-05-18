import db from '../db.js';

export const getMarks = (req, res) => {
  const q = `
    SELECT m.*, t.first_names, t.last_name, tr.trade_name, mo.module_name 
    FROM marks m
    JOIN trainees t ON m.trainee_id = t.trainee_id
    JOIN trades tr ON m.trade_id = tr.trade_id
    JOIN modules mo ON m.module_id = mo.module_id
  `;
  db.query(q, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getMarkById = (req, res) => {
  const { id } = req.params;
  const q = 'SELECT * FROM marks WHERE mark_id = ?';
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Mark not found' });
    res.json(result[0]);
  });
};

export const createMark = (req, res) => {
  const {
    trainee_id,
    trade_id,
    module_id,
    user_id,
    formative_ass,
    comprehensive_ass,
    total_marks_100,
  } = req.body;

  const q = `
    INSERT INTO marks 
    (trainee_id, trade_id, module_id, user_id, formative_ass, comprehensive_ass, total_marks_100)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    q,
    [trainee_id, trade_id, module_id, user_id, formative_ass, comprehensive_ass, total_marks_100],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Marks added successfully' });
    }
  );
};

export const updateMark = (req, res) => {
  const { id } = req.params;
  const {
    trainee_id,
    trade_id,
    module_id,
    user_id,
    formative_ass,
    comprehensive_ass,
    total_marks_100,
  } = req.body;

  const q = `
    UPDATE marks 
    SET trainee_id = ?, trade_id = ?, module_id = ?, user_id = ?, 
        formative_ass = ?, comprehensive_ass = ?, total_marks_100 = ?
    WHERE mark_id = ?
  `;
  db.query(
    q,
    [trainee_id, trade_id, module_id, user_id, formative_ass, comprehensive_ass, total_marks_100, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Mark updated successfully' });
    }
  );
};

export const deleteMark = (req, res) => {
  const { id } = req.params;
  const q = 'DELETE FROM marks WHERE mark_id = ?';
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Mark deleted successfully' });
  });
};
