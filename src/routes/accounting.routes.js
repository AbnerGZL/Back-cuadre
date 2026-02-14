import express from 'express';
import accountingController from '../controllers/accounting.controller.js';

const router = express.Router();

router.get('/list', accountingController.list);
router.post('/create', accountingController.create);
router.get('/get/:id', accountingController.getOne);
router.put('/edit/:id', accountingController.edit);
router.delete('/delete/:id', accountingController.delete);

export default router;
