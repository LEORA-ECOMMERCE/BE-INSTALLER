"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const products_1 = require("../../models/products");
const requestHandler_1 = require("../../utilities/requestHandler");
const productSchema_1 = require("../../validations/productSchema");
const priceCalculator_1 = require("../../utilities/priceCalculator");
const updateProduct = async (req, res) => {
    const { error, value: validatedData } = (0, requestHandler_1.validateRequest)(productSchema_1.updateProductSchema, req.body);
    if (error)
        return (0, requestHandler_1.handleValidationError)(res, error);
    try {
        const product = await products_1.ProductModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                productId: validatedData.productId
            }
        });
        if (!product) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('Product not found'));
        }
        const updatedPrice = validatedData.productPrice ?? product.productPrice;
        const updatedDiscount = validatedData.productDiscount ?? product.productDiscount;
        if (validatedData.productPrice !== undefined ||
            validatedData.productDiscount !== undefined) {
            validatedData.productSellPrice = (0, priceCalculator_1.calculateSellPrice)({
                originalPrice: Number(updatedPrice),
                discountPercent: Number(updatedDiscount)
            });
        }
        await product.update(validatedData);
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateProduct = updateProduct;
