"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBase64 = void 0;
const validateBase64 = (str) => {
    const base64Regex = /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(str);
};
exports.validateBase64 = validateBase64;
