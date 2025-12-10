"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailPaymentMethod = exports.findAllPaymentMethods = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const requestHandler_1 = require("../../utilities/requestHandler");
const pagination_1 = require("../../utilities/pagination");
const paymentMethods_1 = require("../../models/paymentMethods");
const findAllPaymentMethods = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const result = await paymentMethods_1.PaymentMethodModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [
                        { paymentMethodBankName: { [sequelize_1.Op.like]: `%${req.query.search}%` } },
                        { paymentMethodType: { [sequelize_1.Op.like]: `%${req.query.search}%` } }
                    ]
                })
            },
            order: [['paymentMethodId', 'desc']],
            ...(req.query.pagination === 'true' && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.default;
        response.data = page.data(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllPaymentMethods = findAllPaymentMethods;
const findDetailPaymentMethod = async (req, res) => {
    const requestParams = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['paymentMethodId'],
        requestData: requestParams
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await paymentMethods_1.PaymentMethodModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                paymentMethodId: { [sequelize_1.Op.eq]: requestParams.paymentMethodId }
            }
        });
        if (!result) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error('not found!'));
        }
        const response = response_1.ResponseData.default;
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailPaymentMethod = findDetailPaymentMethod;
