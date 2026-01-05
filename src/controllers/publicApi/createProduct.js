"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductPublic = void 0;
const http_status_codes_1 = require("http-status-codes");
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
            //   new
            productIsVisible: validatedData.isVisible,
            productCode: validatedData.code,
            productBarcode: validatedData.barcode,
            productUnit: validatedData.unit
        };
        await products_1.ProductModel.create(productPayload);
        const response = response_1.ResponseData.default;
        const result = { message: 'success' };
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createProductPublic = createProductPublic;
