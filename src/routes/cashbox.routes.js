import express from 'express';
import movementController from '../controllers/cashbox.controller.js';

const router = express.Router();

router.get('/list', movementController.list);
router.post('/create', movementController.create);
router.get('/get', movementController.getOne);
router.put('/edit/:id', movementController.edit);
router.delete('/delete/:id', movementController.delete);

export default router;
