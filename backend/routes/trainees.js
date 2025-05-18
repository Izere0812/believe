import express from 'express';
import * as controller from '../controllers/traineesController.js';

const router = express.Router();

router.get('/', controller.getTrainees);
router.get('/:id', controller.getTraineeById);
router.post('/', controller.createTrainee);
router.put('/:id', controller.updateTrainee);
router.delete('/:id', controller.deleteTrainee);

export default router;
