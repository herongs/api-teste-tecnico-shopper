import { Request, Response } from "express";
import { readingService } from "../services/readingService";

import dotenv from "dotenv";

dotenv.config();
export class ReadingController {
  public static async createReading(req: Request, res: Response) {
    try {
      const { image, customer_code, measure_datetime, measure_type } = req.body;

      // Valida os dados
      if (!image || !customer_code || !measure_datetime || !measure_type) {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Missing required fields",
        });
      }

      // Verifica se já existe uma leitura para o mês atual
      const existingReading = await readingService.findReadingByMonth(
        measure_datetime,
        measure_type
      );
      if (existingReading) {
        return res.status(409).json({
          error_code: "DOUBLE_REPORT",
          error_description: "Leitura do mês já realizada",
        });
      }

      const reading = await readingService.createReading({
        image,
        customer_code,
        measure_datetime,
        measure_type,
      });

      return res.status(200).json(reading);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  public static async confirmReading(req: Request, res: Response) {
    try {
      const { measure_uuid, confirmed_value } = req.body;

      if (!measure_uuid || !confirmed_value) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const reading = await readingService.confirmReading(
        measure_uuid,
        confirmed_value
      );
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // public static async getReading(req: Request, res: Response) {
  //   try {
  //     const { measure_datetime, measure_type } = req.query;

  //     if (!measure_datetime || !measure_type) {
  //       return res
  //         .status(400)
  //         .json({ message: "Missing required query parameters" });
  //     }

  //     const reading = await readingService.getReading(
  //       measure_datetime as Date,
  //       measure_type as "WATER" | "GAS"
  //     );

  //     if (!reading) {
  //       return res.status(404).json({ message: "Reading not found" });
  //     }

  //     return res.status(200).json(reading);
  //   } catch (error) {
  //     return res.status(500).json({ message: error });
  //   }
  // }
}
