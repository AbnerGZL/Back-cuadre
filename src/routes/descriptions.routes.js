import express from 'express';
import descriptionsController from '../controllers/descriptions.controller.js';

const router = express.Router();

router.get('/list', descriptionsController.list);
router.post('/create', descriptionsController.create);
router.get('/get/:id', descriptionsController.getOne);
router.put('/edit/:id', descriptionsController.edit);
router.delete('/delete/:id', descriptionsController.delete);

export default router;
