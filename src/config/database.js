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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Reading_1 = require("../models/Reading");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : '0', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Reading_1.Reading],
    synchronize: true,
});
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.AppDataSource.initialize();
});
exports.connectDatabase = connectDatabase;
