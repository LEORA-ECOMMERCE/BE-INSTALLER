"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackOrderSchema = exports.confirmDraftOrderSchema = exports.createDraftFromOrderSchema = exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
const orderItemSchema_1 = require("./orderItemSchema");
exports.createOrderSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    orderShippingFee: joi_1.default.number().min(0).required().messages({
        'number.base': 'Ongkos kirim harus berupa angka',
        'number.min': 'Ongkos kirim tidak boleh negatif',
        'any.required': 'Ongkos kirim wajib diisi'
    }),
    orderCourierCompany: joi_1.default.string().max(50).required().allow(null, '').messages({
        'string.base': 'Kode kurir harus berupa teks',
        'string.max': 'Kode kurir maksimal 50 karakter'
    }),
    orderCourierType: joi_1.default.string().max(50).required().allow(null, '').messages({
        'string.base': 'Jenis kurir harus berupa teks',
        'string.max': 'Jenis kurir maksimal 50 karakter'
    }),
    items: joi_1.default.array().items(orderItemSchema_1.orderItemSchema).min(1).required().messages({
        'array.base': 'Items harus berupa array',
        'array.min': 'Minimal 1 item harus dipesan',
        'any.required': 'Items wajib diisi'
    })
});
exports.createDraftFromOrderSchema = joi_1.default.object({
    user: jwtPayloadSchema_1.jwtPayloadSchema,
    orderId: joi_1.default.number().integer().required()
});
exports.confirmDraftOrderSchema = joi_1.default.object({
    user: jwtPayloadSchema_1.jwtPayloadSchema,
    orderId: joi_1.default.number().integer().positive().required()
});
exports.trackOrderSchema = joi_1.default.object({
    user: jwtPayloadSchema_1.jwtPayloadSchema,
    orderId: joi_1.default.number().integer().positive().required()
});
