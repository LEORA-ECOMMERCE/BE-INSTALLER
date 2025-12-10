"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePaymentMethod = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const requestHandler_1 = require("../../utilities/requestHandler");
const paymentMethods_1 = require("../../models/paymentMethods");
const removePaymentMethod = async (req, res) => {
    const requestQuery = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['paymentMethodId'],
        requestData: requestQuery
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await paymentMethods_1.PaymentMethodModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                paymentMethodId: { [sequelize_1.Op.eq]: requestQuery.paymentMethodId }
            }
        });
        if (!result) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('payment method not found!'));
        }
        result.deleted = 1;
        await result.save();
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removePaymentMethod = removePaymentMethod;
