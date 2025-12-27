"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePromotion = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const products_1 = require("../../models/products");
const requestHandler_1 = require("../../utilities/requestHandler");
const promotionSchema_1 = require("../../validations/promotionSchema");
const removePromotion = async (req, res) => {
    console.log(req.query);
    const { error, value } = (0, requestHandler_1.validateRequest)(promotionSchema_1.removePromotionSchema, req.query);
    if (error)
        return (0, requestHandler_1.handleValidationError)(res, error);
    try {
        const { productId } = value;
        await products_1.ProductModel.update({ productIsHighlight: false }, { where: { productId } });
        const response = response_1.ResponseData.default;
        response.data = { message: 'Product promotion removed successfully' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removePromotion = removePromotion;
