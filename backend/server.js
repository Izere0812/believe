import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import tradesRoutes from './routes/trades.js';
import traineesRoutes from './routes/trainees.js';
import modulesRoutes from './routes/modules.js';
import marksRoutes from './routes/marks.js';
import reportsRoutes from './routes/reports.js';
import db from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/trades', tradesRoutes);
app.use('/api/trainees', traineesRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/reports', reportsRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
