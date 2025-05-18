import express from 'express';
import * as controller from '../controllers/modulesController.js';

const router = express.Router();

router.get('/', controller.getModules);
router.get('/:id', controller.getModuleById);
router.post('/', controller.createModule);
router.put('/:id', controller.updateModule);
router.delete('/:id', controller.deleteModule);

export default router;
