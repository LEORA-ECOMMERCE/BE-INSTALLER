"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailTransaction = exports.findAllTransaction = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const requestCheker_1 = require("../../utilities/requestCheker");
const transactions_1 = require("../../models/transactions");
const user_1 = require("../../models/user");
const orders_1 = require("../../models/orders");
const requestHandler_1 = require("../../utilities/requestHandler");
const findAllTransaction = async (req, res) => {
    try {
        const userRole = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: req.jwtPayload?.userId
            }
        });
        const page = new pagination_1.Pagination(Number(req.query.page) ?? 0, Number(req.query.size) ?? 10);
        console.log(page);
        const result = await transactions_1.TransactionsModel.findAndCountAll({
            where: {
                ...(Boolean(userRole?.dataValues.userRole === 'user') && {
                    transactionUserId: { [sequelize_1.Op.eq]: req.jwtPayload?.userId }
                }),
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ transactionId: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                })
            },
            include: [
                {
                    model: user_1.UserModel,
                    attributes: ['userId', 'userName']
                },
                { model: orders_1.OrdersModel }
            ],
            order: [['transactionId', 'desc']],
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
exports.findAllTransaction = findAllTransaction;
const findDetailTransaction = async (req, res) => {
    const requestParams = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['transactionId'],
        requestData: requestParams
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await transactions_1.TransactionsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                transactionId: { [sequelize_1.Op.eq]: requestParams.transactionId }
            },
            include: [
                {
                    model: user_1.UserModel,
                    attributes: ['userId', 'userName', 'userPhoto']
                },
                { model: orders_1.OrdersModel }
            ]
        });
        if (result == null) {
            const message = 'not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const response = response_1.ResponseData.default;
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailTransaction = findDetailTransaction;
