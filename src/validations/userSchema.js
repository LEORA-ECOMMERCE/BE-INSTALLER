"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpSchema = exports.requestOtpSchema = exports.userUpdatePasswordSchema = exports.userUpdateSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.userSchema = joi_1.default.object({
    user: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().required(),
    userEmail: joi_1.default.string().email().required(),
    userPassword: joi_1.default.string().min(6).required(),
    userWhatsAppNumber: joi_1.default.string().required(),
    userPhoto: joi_1.default.string().uri().optional(),
    userRole: joi_1.default.string().valid('user', 'admin', 'superAdmin').required(),
    userGender: joi_1.default.string().valid('pria', 'wanita').required(),
    userCoin: joi_1.default.number().min(0).optional().default(0),
    userFcmId: joi_1.default.string().required().optional(),
    userPartnerCode: joi_1.default.string().required()
});
exports.userUpdateSchema = joi_1.default.object({
    user: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().optional(),
    userEmail: joi_1.default.string().email().optional(),
    userPassword: joi_1.default.string().min(6).optional(),
    userWhatsAppNumber: joi_1.default.string().optional(),
    userPhoto: joi_1.default.string().uri().optional(),
    userRole: joi_1.default.string().valid('user', 'admin', 'superAdmin').optional(),
    userGender: joi_1.default.string().valid('pria', 'wanita').optional(),
    userCoin: joi_1.default.number().min(0).optional(),
    userFcmId: joi_1.default.string().optional(),
    userPartnerCode: joi_1.default.string().optional()
});
exports.userUpdatePasswordSchema = joi_1.default.object({
    userPassword: joi_1.default.string().min(6).required(),
    userWhatsAppNumber: joi_1.default.string().required()
});
exports.requestOtpSchema = joi_1.default.object({
    whatsappNumber: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required(),
    otpType: joi_1.default.string().valid('register', 'resetPassword').required()
});
exports.verifyOtpSchema = joi_1.default.object({
    whatsappNumber: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required(),
    otpCode: joi_1.default.string().max(100).required()
});
