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
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Missing required fields",
        });
      }

      // Busca a leitura com a measure_uuid fornecida
      const reading = await readingService.getReadingByUUID(
        measure_uuid as string
      );

      // Retorna erro 404 se a leitura não for encontrada
      if (!reading) {
        return res.status(404).json({
          error_code: "MEASURE_NOT_FOUND",
          error_description: "Leitura não encontrada",
        });
      }

      // Verifica se a leitura já foi confirmada
      if (reading.confirmed) {
        return res.status(409).json({
          error_code: "CONFIRMATION_DUPLICATE",
          error_description: "Leitura do mês já realizada",
        });
      }

      await readingService.confirmReading(measure_uuid, confirmed_value);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public static async listReadings(req: Request, res: Response) {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    // Valida o parâmetro measure_type se for fornecido
    if (
      measure_type &&
      typeof measure_type === "string" &&
      !["WATER", "GAS"].includes(measure_type.toUpperCase())
    ) {
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida",
      });
    }

    try {
      // Busca as medidas
      const readings = await readingService.listReadings(
        customer_code,
        measure_type as string | undefined
      );

      if (readings.length === 0) {
        return res.status(404).json({
          error_code: "MEASURES_NOT_FOUND",
          error_description: "Nenhuma leitura encontrada",
        });
      }

      return res.status(200).json({
        customer_code,
        measures: readings,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
