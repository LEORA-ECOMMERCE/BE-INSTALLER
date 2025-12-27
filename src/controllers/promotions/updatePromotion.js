"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePromotion = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const products_1 = require("../../models/products");
const requestHandler_1 = require("../../utilities/requestHandler");
const models_1 = require("../../models");
const promotionSchema_1 = require("../../validations/promotionSchema");
const updatePromotion = async (req, res) => {
    const { error, value } = (0, requestHandler_1.validateRequest)(promotionSchema_1.updatePromotionSchema, req.body);
    if (error)
        return (0, requestHandler_1.handleValidationError)(res, error);
    const { products } = value;
    const transaction = await models_1.sequelize.transaction();
    try {
        for (const item of products) {
            await products_1.ProductModel.update({ productIsHighlight: item.productIsHighlight }, {
                where: { productId: item.productId },
                transaction
            });
        }
        await transaction.commit();
        const response = response_1.ResponseData.default;
        response.data = {
            message: 'Product highlight updated successfully'
        };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        await transaction.rollback();
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updatePromotion = updatePromotion;
