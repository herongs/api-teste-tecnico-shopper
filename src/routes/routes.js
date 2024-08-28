"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const uploadController_1 = require("../controllers/uploadController");
exports.router = (0, express_1.Router)();
exports.router.post('/upload', uploadController_1.uploadController);
