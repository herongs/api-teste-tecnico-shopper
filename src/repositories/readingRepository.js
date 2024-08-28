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
exports.readingRepository = void 0;
const database_1 = require("../config/database");
const Reading_1 = require("../models/Reading");
exports.readingRepository = {
    save: (readingData) => __awaiter(void 0, void 0, void 0, function* () {
        const readingRepo = database_1.AppDataSource.getRepository(Reading_1.Reading);
        const reading = readingRepo.create(readingData);
        return yield readingRepo.save(reading);
    }),
    findOne: (criteria) => __awaiter(void 0, void 0, void 0, function* () {
        const readingRepo = database_1.AppDataSource.getRepository(Reading_1.Reading);
        return yield readingRepo.findOneBy(criteria);
    })
};
