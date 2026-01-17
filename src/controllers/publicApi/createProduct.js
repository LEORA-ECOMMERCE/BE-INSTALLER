"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductPublic = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const products_1 = require("../../models/products");
const requestHandler_1 = require("../../utilities/requestHandler");
const priceCalculator_1 = require("../../utilities/priceCalculator");
const publicApiSchema_1 = require("../../validations/publicApiSchema");
const createProductPublic = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(publicApiSchema_1.createProductPublicSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        /* ===============================
         * DUPLICATE CODE / BARCODE CHECK
         * =============================== */
        if (validatedData.code || validatedData.barcode) {
            const orConditions = [];
            if (validatedData.code) {
                orConditions.push({ productCode: validatedData.code });
            }
            if (validatedData.barcode) {
                orConditions.push({ productBarcode: validatedData.barcode });
            }
            const duplicateProduct = await products_1.ProductModel.findOne({
                where: {
                    deleted: 0,
                    [sequelize_1.Op.or]: orConditions
                }
            });
            if (duplicateProduct) {
                let message = 'Product sudah terdaftar';
                if (validatedData.code &&
                    validatedData.barcode &&
                    duplicateProduct.productCode === validatedData.code &&
                    duplicateProduct.productBarcode === validatedData.barcode) {
                    message = 'Product code dan barcode sudah terdaftar';
                }
                else if (validatedData.code &&
                    duplicateProduct.productCode === validatedData.code) {
                    message = 'Product code sudah terdaftar';
                }
                else if (validatedData.barcode &&
                    duplicateProduct.productBarcode === validatedData.barcode) {
                    message = 'Product barcode sudah terdaftar';
                }
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
            }
        }
        /* ===============================
         * CREATE PRODUCT
         * =============================== */
        const productSellPrice = (0, priceCalculator_1.calculateSellPrice)({
            originalPrice: validatedData.price,
            discountPercent: 0
        });
        const productPayload = {
            productName: validatedData.name,
            productDescription: '',
            productImages: [],
            productPrice: validatedData.price,
            productDiscount: 0,
            productStock: validatedData.stock,
            productWeight: validatedData.weight,
            productIsHighlight: false,
            productSellPrice: productSellPrice,
            productIsVisible: validatedData.isVisible,
            productCode: validatedData.code,
            productBarcode: validatedData.barcode,
            productUnit: validatedData.unit
        };
        await products_1.ProductModel.create(productPayload);
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createProductPublic = createProductPublic;
