"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentMethod = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const requestHandler_1 = require("../../utilities/requestHandler");
const paymentMethods_1 = require("../../models/paymentMethods");
const updatePaymentMethod = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['paymentMethodId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await paymentMethods_1.PaymentMethodModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                paymentMethodId: { [sequelize_1.Op.eq]: requestBody.paymentMethodId }
            }
        });
        if (!result) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error('not found!'));
        }
        const newData = {
            ...(requestBody.paymentMethodType && {
                paymentMethodType: requestBody.paymentMethodType
            }),
            ...(requestBody.paymentMethodBankName && {
                paymentMethodBankName: requestBody.paymentMethodBankName
            }),
            ...(requestBody.paymentMethodBankNumber && {
                paymentMethodBankNumber: requestBody.paymentMethodBankNumber
            }),
            ...(requestBody.paymentMethodBankOwner && {
                paymentMethodBankOwner: requestBody.paymentMethodBankOwner
            }),
            ...(requestBody.paymentMethodQris && {
                paymentMethodQris: requestBody.paymentMethodQris
            }),
            ...(requestBody.paymentMethodDescription && {
                paymentMethodDescription: requestBody.paymentMethodDescription
            })
        };
        await paymentMethods_1.PaymentMethodModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                paymentMethodId: { [sequelize_1.Op.eq]: requestBody.paymentMethodId }
            }
        });
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updatePaymentMethod = updatePaymentMethod;
