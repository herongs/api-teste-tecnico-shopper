import { Reading } from '../models/Reading';
import { readingRepository } from '../repositories/readingRepository';

interface ReadingData {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
}

export const readingService = {
  getReading: async (customer_code: string, measure_datetime: Date, measure_type: 'WATER' | 'GAS') => {
    return await readingRepository.findOne({ customer_code, measure_datetime, measure_type });
  },

  saveReading: async (readingData: ReadingData): Promise<Reading> => {
    return await readingRepository.save(readingData);
  }
};
