import { Router } from 'express';
import { ReadingController } from '../controllers/ReadingController';

export const router = Router();

router.post('/upload', ReadingController.createReading);
router.get('/reading', ReadingController.getReading);
