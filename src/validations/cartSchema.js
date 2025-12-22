"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllCartSchema = exports.findDetailCartSchema = exports.removeCartSchema = exports.createCartSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createCartSchema = joi_1.default.object({
    cartProductId: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'cartProductId harus berupa angka',
        'number.integer': 'cartProductId harus bilangan bulat',
        'number.positive': 'cartProductId harus lebih dari 0',
        'any.required': 'cartProductId wajib diisi'
    }),
    cartTotalItem: joi_1.default.number().integer().min(1).required().messages({
        'number.base': 'cartTotalItem harus berupa angka',
        'number.integer': 'cartTotalItem harus bilangan bulat',
        'number.min': 'cartTotalItem minimal 1',
        'any.required': 'cartTotalItem wajib diisi'
    })
});
exports.removeCartSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    cartId: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'cartId harus berupa angka',
        'number.integer': 'cartId harus bilangan bulat',
        'number.positive': 'cartId harus lebih dari 0',
        'any.required': 'cartId wajib diisi'
    })
});
exports.findDetailCartSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema
});
exports.findAllCartSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
