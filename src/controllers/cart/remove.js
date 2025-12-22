"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const carts_1 = require("../../models/carts");
const requestHandler_1 = require("../../utilities/requestHandler");
const cartSchema_1 = require("../../validations/cartSchema");
const removeCart = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(cartSchema_1.removeCartSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await carts_1.CartsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                cartId: { [sequelize_1.Op.eq]: validatedData.cartId },
                cartUserId: { [sequelize_1.Op.eq]: req.jwtPayload?.userId }
            }
        });
        if (result == null) {
            const message = 'cart not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        result.deleted = 1;
        void result.save();
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removeCart = removeCart;
