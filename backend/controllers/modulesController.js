import db from '../db.js';

export const getModules = (req, res) => {
  const q = 'SELECT * FROM modules';
  db.query(q, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getModuleById = (req, res) => {
  const { id } = req.params;
  const q = 'SELECT * FROM modules WHERE module_id = ?';
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Module not found' });
    res.json(result[0]);
  });
};

export const createModule = (req, res) => {
  const { module_name, module_credits } = req.body;
  const q = `
    INSERT INTO modules (module_name, module_credits)
    VALUES (?, ?)
  `;
  db.query(q, [module_name, module_credits], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Module created successfully' });
  });
};

export const updateModule = (req, res) => {
  const { id } = req.params;
  const { module_name, module_credits } = req.body;
  const q = `
    UPDATE modules 
    SET module_name = ?, module_credits = ?
    WHERE module_id = ?
  `;
  db.query(q, [module_name, module_credits, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Module updated successfully' });
  });
};

export const deleteModule = (req, res) => {
  const { id } = req.params;
  const q = 'DELETE FROM modules WHERE module_id = ?';
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Module deleted successfully' });
  });
};
