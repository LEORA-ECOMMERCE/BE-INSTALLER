"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductPublic = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const products_1 = require("../../models/products");
const requestHandler_1 = require("../../utilities/requestHandler");
const publicApiSchema_1 = require("../../validations/publicApiSchema");
const updateProductPublic = async (req, res) => {
    const { error, value: validatedData } = (0, requestHandler_1.validateRequest)(publicApiSchema_1.updateProductPublicSchema, req.body);
    if (error)
        return (0, requestHandler_1.handleValidationError)(res, error);
    try {
        const product = await products_1.ProductModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                productCode: validatedData.code
            }
        });
        if (!product) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error(`Product with code (${validatedData.code}) is not found`));
        }
        const productPayload = {};
        if (validatedData.name !== undefined) {
            productPayload.productName = validatedData.name;
        }
        if (validatedData.price !== undefined) {
            productPayload.productPrice = validatedData.price;
        }
        if (validatedData.stock !== undefined) {
            productPayload.productStock = validatedData.stock;
        }
        if (validatedData.weight !== undefined) {
            productPayload.productWeight = validatedData.weight;
        }
        if (validatedData.barcode !== undefined) {
            productPayload.productBarcode = validatedData.barcode;
        }
        if (validatedData.unit !== undefined) {
            productPayload.productUnit = validatedData.unit;
        }
        if (validatedData.isVisible !== undefined) {
            productPayload.productIsVisible = validatedData.isVisible;
        }
        if (Object.keys(productPayload).length === 0) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(response_1.ResponseData.error('No data provided to update'));
        }
        await product.update(productPayload);
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateProductPublic = updateProductPublic;
