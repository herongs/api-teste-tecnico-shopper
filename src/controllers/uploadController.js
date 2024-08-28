"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const uploadService_1 = require("../services/uploadService");
const uploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, customer_code, measure_datetime, measure_type } = req.body;
        // Valida os dados
        if (!image || !customer_code || !measure_datetime || !measure_type) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // Verifica se já existe uma leitura
        const existingReading = yield uploadService_1.readingService.getReading(customer_code, new Date(measure_datetime), measure_type);
        if (existingReading) {
            return res.status(400).json({ message: 'Reading already exists for the month' });
        }
        // Salva a nova leitura
        const newReading = {
            image,
            image_url: '', // Placeholder, já que o Gemini não está integrado
            measure_value: 0, // Placeholder, já que o Gemini não está integrado
            measure_uuid: '', // Placeholder, já que o Gemini não está integrado
            customer_code,
            measure_datetime: new Date(measure_datetime),
            measure_type
        };
        yield uploadService_1.readingService.saveReading(newReading);
        res.status(201).json(newReading);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.uploadController = uploadController;
