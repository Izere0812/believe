import db from '../db.js';

export const getTraineeReport = (req, res) => {
  const { traineeId } = req.params;
  const q = `
    SELECT 
      t.first_names, t.last_name, tr.trade_name, 
      mo.module_name, mo.module_credits,
      m.formative_ass, m.comprehensive_ass, m.total_marks_100
    FROM marks m
    JOIN trainees t ON m.trainee_id = t.trainee_id
    JOIN trades tr ON m.trade_id = tr.trade_id
    JOIN modules mo ON m.module_id = mo.module_id
    WHERE m.trainee_id = ?
  `;
  db.query(q, [traineeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "No records found for this trainee" });
    res.json(results);
  });
};
