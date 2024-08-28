import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Reading } from '../models/Reading';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Reading],
  synchronize: true,
});

export const connectDatabase = async () => {
  await AppDataSource.initialize();
};
