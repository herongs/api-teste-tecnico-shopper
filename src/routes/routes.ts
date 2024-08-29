import { Router } from 'express';
import { ReadingController } from '../controllers/ReadingController';

export const router = Router();

router.post('/upload', ReadingController.createReading);
router.patch('/confirm', ReadingController.confirmReading);
router.get("/:customer_code/list", ReadingController.listReadings);


