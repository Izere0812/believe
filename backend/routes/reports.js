import express from 'express';
import * as controller from '../controllers/reportsController.js';

const router = express.Router();

// Get report by trainee ID (show trade and module marks)
router.get('/:traineeId', controller.getTraineeReport);

export default router;
