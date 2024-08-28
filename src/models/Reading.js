"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reading = void 0;
const typeorm_1 = require("typeorm");
let Reading = class Reading {
};
exports.Reading = Reading;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
], Reading.prototype, "measure_uuid", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Reading.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 })
], Reading.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50 })
], Reading.prototype, "customer_code", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp')
], Reading.prototype, "measure_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: ['WATER', 'GAS'] })
], Reading.prototype, "measure_type", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Reading.prototype, "measure_value", void 0);
exports.Reading = Reading = __decorate([
    (0, typeorm_1.Entity)()
], Reading);
