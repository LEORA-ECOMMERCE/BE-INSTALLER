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
        /**
         * ===============================
         * FIND CURRENT PRODUCT
         * ===============================
         */
        const product = await products_1.ProductModel.findOne({
            where: {
                deleted: 0,
                productId: validatedData.productId
            }
        });
        if (!product) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('Product not found'));
        }
        /**
         * ===============================
         * CHECK DUPLICATE CODE / BARCODE
         * ===============================
         */
        if (validatedData.productCode || validatedData.productBarcode) {
            const orConditions = [];
            if (validatedData.productCode) {
                orConditions.push({ productCode: validatedData.productCode });
            }
            if (validatedData.productBarcode) {
                orConditions.push({ productBarcode: validatedData.productBarcode });
            }
            const duplicateProduct = await products_1.ProductModel.findOne({
                where: {
                    deleted: 0,
                    productId: { [sequelize_1.Op.ne]: validatedData.productId },
                    [sequelize_1.Op.or]: orConditions
                }
            });
            if (duplicateProduct) {
                let message = 'Product sudah terdaftar';
                if (validatedData.productCode &&
                    validatedData.productBarcode &&
                    duplicateProduct.productCode === validatedData.productCode &&
                    duplicateProduct.productBarcode === validatedData.productBarcode) {
                    message = 'Product code dan barcode sudah terdaftar';
                }
                else if (validatedData.productCode &&
                    duplicateProduct.productCode === validatedData.productCode) {
                    message = 'Product code sudah terdaftar';
                }
                else if (validatedData.productBarcode &&
                    duplicateProduct.productBarcode === validatedData.productBarcode) {
                    message = 'Product barcode sudah terdaftar';
                }
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
            }
        }
        /**
         * ===============================
         * RECALCULATE SELL PRICE (OPTIONAL)
         * ===============================
         */
        const updatedPrice = validatedData.productPrice ?? product.productPrice;
        const updatedDiscount = validatedData.productDiscount ?? product.productDiscount;
        if (validatedData.productPrice !== undefined ||
            validatedData.productDiscount !== undefined) {
            validatedData.productSellPrice = (0, priceCalculator_1.calculateSellPrice)({
                originalPrice: Number(updatedPrice),
                discountPercent: Number(updatedDiscount)
            });
        }
        /**
         * ===============================
         * UPDATE PRODUCT
         * ===============================
         */
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
