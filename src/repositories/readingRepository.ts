import { AppDataSource } from '../config/database';
import { Reading } from '../models/Reading';

export const readingRepository = {
  save: async (readingData: Partial<Reading>) => {
    const readingRepo = AppDataSource.getRepository(Reading);
    const reading = readingRepo.create(readingData);
    return await readingRepo.save(reading);
  },

  findOne: async (criteria: { customer_code: string, measure_datetime: Date, measure_type: 'WATER' | 'GAS' }) => {
    const readingRepo = AppDataSource.getRepository(Reading);
    return await readingRepo.findOneBy(criteria);
  }
};
