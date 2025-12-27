"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePromotionSchema = exports.updatePromotionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updatePromotionSchema = joi_1.default.object({
    products: joi_1.default.array()
        .items(joi_1.default.object({
        productId: joi_1.default.number().required(),
        productIsHighlight: joi_1.default.boolean().required()
    }))
        .min(1)
        .required()
});
exports.removePromotionSchema = joi_1.default.object({
    productId: joi_1.default.number().required()
});
