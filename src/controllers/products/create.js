"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const products_1 = require("../../models/products");
const requestHandler_1 = require("../../utilities/requestHandler");
const priceCalculator_1 = require("../../utilities/priceCalculator");
const productSchema_1 = require("../../validations/productSchema");
const createProduct = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(productSchema_1.createProductSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const productSellPrice = (0, priceCalculator_1.calculateSellPrice)({
            originalPrice: Number(validatedData.productPrice),
            discountPercent: Number(validatedData.productDiscount)
        });
        validatedData.productSellPrice = productSellPrice;
        validatedData.productIsVisible = true;
        await products_1.ProductModel.create(validatedData);
        const response = response_1.ResponseData.default;
        const result = { message: 'success' };
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createProduct = createProduct;
