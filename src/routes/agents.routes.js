import express from 'express';
import agentsController from '../controllers/agents.controller.js';

const router = express.Router();

router.get('/list', agentsController.list);
router.post('/create', agentsController.create);
router.get('/get/:id', agentsController.getOne);
router.put('/edit/:id', agentsController.edit);
router.delete('/delete/:id', agentsController.delete);

export default router;
