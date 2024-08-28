import { Request, Response } from 'express';
import { Reading } from '../models/Reading';
import { readingService } from '../services/uploadService';

export class ReadingController {
  public static async createReading(req: Request, res: Response) {
    try {
      const { image, customer_code, measure_datetime, measure_type } = req.body;

      // Valida os dados
      if (!image || !customer_code || !measure_datetime || !measure_type) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const existingReading = await readingService.getReading(customer_code, new Date(measure_datetime), measure_type);

      if (existingReading) {
        return res.status(400).json({ message: 'Reading already exists for the month' });
      }

      const newReading: Reading = {
        image,
        image_url: '', // Placeholder
        measure_value: 0, // Placeholder
        measure_uuid: '', // Placeholder
        customer_code,
        measure_datetime: new Date(measure_datetime),
        measure_type
      };

      const savedReading = await readingService.saveReading(newReading);

      return res.status(201).json(savedReading);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public static async getReading(req: Request, res: Response) {
    try {
      const { customer_code, measure_datetime, measure_type } = req.query;

      if (!customer_code || !measure_datetime || !measure_type) {
        return res.status(400).json({ message: 'Missing required query parameters' });
      }

      const reading = await readingService.getReading(customer_code as string, new Date(measure_datetime as string), measure_type as 'WATER' | 'GAS');

      if (!reading) {
        return res.status(404).json({ message: 'Reading not found' });
      }

      return res.status(200).json(reading);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}