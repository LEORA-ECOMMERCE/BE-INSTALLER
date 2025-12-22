"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.orderItemSchema = joi_1.default.object({
    productId: joi_1.default.number().min(0).required().messages({
        'string.base': 'Product ID harus berupa angka',
        'string.empty': 'Product ID tidak boleh kosong',
        'any.required': 'Product ID wajib diisi'
    }),
    quantity: joi_1.default.number().integer().min(1).required().messages({
        'number.base': 'Quantity harus berupa angka',
        'number.integer': 'Quantity harus bilangan bulat',
        'number.min': 'Quantity minimal 1',
        'any.required': 'Quantity wajib diisi'
    })
});
