import { Reading } from "../models/Reading";
import { readingRepository } from "../repositories/readingRepository";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import fs from "fs";
import path from "path";

interface ReadingData {
  confirmed: boolean;
  image_url: string;
  measure_value: number;
  customer_code: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
}

interface ReadingResponse {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
}

export const readingService = {
  createReading: async (data: {
    image: string;
    customer_code: string;
    measure_datetime: Date;
    measure_type: "WATER" | "GAS";
  }) => {
    const { image, customer_code, measure_datetime, measure_type } = data;

    const imageExtension = readingService.getImageExtension(image);
    const imageFileName = `${customer_code}.${imageExtension}`;
    const imagePath = readingService.saveImage(image, imageFileName);

    try {
      const uploadResponse = await readingService.uploadImage(
        imagePath,
        imageExtension,
        imageFileName
      );
      const measureValue = await readingService.extractMeasureValue(
        uploadResponse.file.mimeType,
        uploadResponse.file.uri
      );

      const newReading: ReadingData = {
        image_url: uploadResponse.file.uri,
        measure_value: measureValue,
        customer_code,
        measure_datetime: new Date(measure_datetime),
        measure_type,
        confirmed: false
      };

      const savedReading = await readingRepository.save(newReading);

      // Gera e atualiza a measure_uuid
      const updatedReading = {
        ...savedReading,
        measure_uuid: savedReading.measure_uuid, // Ou como você estiver gerando o UUID
      };

      // Atualiza a URL com a medida UUID
      updatedReading.image_url = `${process.env.API_BASE_URL}/image/${updatedReading.measure_uuid}`;

      // Atualiza o registro com a nova URL
      await readingRepository.updateReading(updatedReading);

      //retorne a resposta baseado na interface ReadingResponse
      const readingResponse: ReadingResponse = {
        image_url: updatedReading.image_url,
        measure_value: updatedReading.measure_value,
        measure_uuid: updatedReading.measure_uuid,
      };

      return readingResponse;
    } catch (error) {
      throw new Error("Failed to create reading");
    }
  },

  getReadingByUUID: async (
    measure_uuid: string
  ): Promise<ReadingData | null> => {
    const reading = await readingRepository.findOneConfirmed({ measure_uuid });
    return reading;
  },

  // Função para confirmar uma leitura
  confirmReading: async (measure_uuid: string, confirmed_value: number) => {
    const reading = await readingRepository.findOneConfirmed({ measure_uuid });

    if (!reading) {
      throw new Error("Reading not found");
    }

    reading.confirmed = true;
    reading.measure_value = confirmed_value;

    return await readingRepository.saveConfirmedReading(reading);
  },

  // Funções auxiliares para processar a imagem
  getImageExtension: (image: string): string => {
    let imageExtension = image.split(";")[0].split("/")[1];
    return imageExtension === "jpg" ? "jpeg" : imageExtension;
  },

  saveImage: (image: string, imageFileName: string): string => {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const imagePath = path.join("uploads", imageFileName);

    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads", { recursive: true });
    }

    fs.writeFileSync(imagePath, base64Data, "base64");
    return imagePath;
  },

  uploadImage: async (
    imagePath: string,
    imageExtension: string,
    imageFileName: string
  ) => {
    const fileManager = new GoogleAIFileManager(
      process.env.GEMINI_API_KEY ?? ""
    );

    return await fileManager.uploadFile(imagePath, {
      mimeType: `image/${imageExtension}`,
      displayName: imageFileName,
    });
  },

  extractMeasureValue: async (
    mimeType: string,
    fileUri: string
  ): Promise<number> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType,
          fileUri,
        },
      },
      {
        text: "Descreva os numeros do contador nesse relogio de agua, me retornando apenas o número",
      },
    ]);

    return Number(result.response.text());
  },

  findReadingByMonth: async (
    measure_datetime: Date,
    measure_type: "WATER" | "GAS"
  ) => {
    return await readingRepository.findOne({
      measure_datetime,
      measure_type,
    });
  },

  listReadings: async (customer_code: string, measure_type?: string) => {
    const readings = await readingRepository.findReadingsByCustomerCode(customer_code, measure_type);
    
    return readings.map((reading: { measure_uuid: string; measure_datetime: Date; measure_type: string; confirmed: boolean; image_url: string; }) => ({
      measure_uuid: reading.measure_uuid,
      measure_datetime: reading.measure_datetime,
      measure_type: reading.measure_type,
      has_confirmed: reading.confirmed,
      image_url: reading.image_url,
    }));
  }
};
