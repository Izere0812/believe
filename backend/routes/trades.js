import express from 'express';
import * as controller from '../controllers/tradesController.js';

const router = express.Router();

router.get('/', controller.getTrades);
router.post('/', controller.createTrade);
router.put('/:id', controller.updateTrade);
router.delete('/:id', controller.deleteTrade);

export default router;
