import { AppDataSource } from "../config/database";
import { Reading } from "../models/Reading";

export const readingRepository = {
  save: async (readingData: Partial<Reading>) => {
    const readingRepo = AppDataSource.getRepository(Reading);
    const reading = readingRepo.create(readingData);
    return await readingRepo.save(reading);
  },

  findOne: async (criteria: {
    measure_datetime: Date;
    measure_type: "WATER" | "GAS";
  }) => {
    const readingRepo = AppDataSource.getRepository(Reading);
    return await readingRepo.findOneBy(criteria);
  },

  findOneConfirmed: async (criteria: { measure_uuid: string }) => {
    const readingRepo = AppDataSource.getRepository(Reading);
    return await readingRepo.findOneBy(criteria);
  },

  updateReading: async (readingData: Reading) => {
    const readingRepo = AppDataSource.getRepository(Reading);
    return await readingRepo.save(readingData);
  },

  saveConfirmedReading: async (readingData: Reading) => {
    const readingRepo = AppDataSource.getRepository(Reading);
    return await readingRepo.save(readingData);
  },

  findReadingsByCustomerCode: async (
    customer_code: string,
    measure_type?: string
  ) => {
    const query = AppDataSource.getRepository(Reading)
      .createQueryBuilder("reading")
      .where("reading.customer_code = :customer_code", { customer_code });

    if (measure_type) {
      const normalizedMeasureType = measure_type.toUpperCase();
      query.andWhere("reading.measure_type = :measure_type", {
        measure_type: normalizedMeasureType,
      });
    }
    const readings = await query.getMany();
    return readings;
  },
};
