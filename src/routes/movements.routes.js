import express from 'express';
import movementController from '../controllers/movement.controller.js';

const router = express.Router();

router.get('/list', movementController.list);
router.post('/create', movementController.create);
router.get('/get/:id', movementController.getForId);
router.put('/edit/:id', movementController.edit);
router.delete('/delete/:id', movementController.delete);

export default router;
