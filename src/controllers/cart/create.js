"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const carts_1 = require("../../models/carts");
const requestHandler_1 = require("../../utilities/requestHandler");
const cartSchema_1 = require("../../validations/cartSchema");
const createCart = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(cartSchema_1.createCartSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const existingCart = await carts_1.CartsModel.findOne({
            where: {
                deleted: 0,
                cartUserId: req.jwtPayload?.userId,
                cartProductId: validatedData.cartProductId
            }
        });
        if (existingCart) {
            existingCart.cartTotalItem += validatedData.cartTotalItem;
            await existingCart.save();
        }
        else {
            validatedData.cartUserId = req.jwtPayload?.userId;
            await carts_1.CartsModel.create(validatedData);
        }
        const response = response_1.ResponseData.default;
        const result = { message: 'success' };
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createCart = createCart;
