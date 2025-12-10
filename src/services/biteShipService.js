"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiteShipService = void 0;
const axios_1 = __importDefault(require("axios"));
exports.BiteShipService = axios_1.default.create({
    baseURL: process.env.BITESHIP_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.BITESHIP_API_KEY}`,
        'Content-Type': 'application/json'
    }
});
