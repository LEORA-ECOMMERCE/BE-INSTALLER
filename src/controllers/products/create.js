"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const products_1 = require("../../models/products");
const requestHandler_1 = require("../../utilities/requestHandler");
const priceCalculator_1 = require("../../utilities/priceCalculator");
const productSchema_1 = require("../../validations/productSchema");
const sequelize_1 = require("sequelize");
const createProduct = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(productSchema_1.createProductSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        /**
         * ===============================
         * CHECK DUPLICATE CODE / BARCODE
         * ===============================
         */
        const existingProduct = await products_1.ProductModel.findOne({
            where: {
                deleted: 0,
                [sequelize_1.Op.or]: [
                    { productCode: validatedData.productCode },
                    { productBarcode: validatedData.productBarcode }
                ]
            }
        });
        if (existingProduct) {
            let message = 'Product sudah terdaftar';
            if (existingProduct.productCode === validatedData.productCode &&
                existingProduct.productBarcode === validatedData.productBarcode) {
                message = 'Product code dan barcode sudah terdaftar';
            }
            else if (existingProduct.productCode === validatedData.productCode) {
                message = 'Product code sudah terdaftar';
            }
            else if (existingProduct.productBarcode === validatedData.productBarcode) {
                message = 'Product barcode sudah terdaftar';
            }
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        /**
         * ===============================
         * CALCULATE SELL PRICE
         * ===============================
         */
        const productSellPrice = (0, priceCalculator_1.calculateSellPrice)({
            originalPrice: Number(validatedData.productPrice),
            discountPercent: Number(validatedData.productDiscount)
        });
        validatedData.productSellPrice = productSellPrice;
        /**
         * ===============================
         * CREATE PRODUCT
         * ===============================
         */
        await products_1.ProductModel.create(validatedData);
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createProduct = createProduct;
