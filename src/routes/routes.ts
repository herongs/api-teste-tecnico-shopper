import { Router } from 'express';
import { ReadingController } from '../controllers/ReadingController';

export const router = Router();

router.post('/upload', ReadingController.createReading);
router.patch('/confirm', ReadingController.confirmReading);

// router.get('/${costumer_code}/list', ReadingController.getReading);


