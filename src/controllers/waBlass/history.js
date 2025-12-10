"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waBlasHistoryFindOne = exports.waBlasHistoryFindAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const waBlasHistory_1 = require("../../models/waBlasHistory");
const requestCheker_1 = require("../../utilities/requestCheker");
const requestHandler_1 = require("../../utilities/requestHandler");
const waBlasHistoryFindAll = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const result = await waBlasHistory_1.WaBlasHistoryModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [
                        { userName: { [sequelize_1.Op.like]: `%${req.query.search}%` } },
                        { userEmail: { [sequelize_1.Op.like]: `%${req.query.search}%` } }
                    ]
                })
            },
            order: [['waBlasHistoryId', 'desc']],
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
exports.waBlasHistoryFindAll = waBlasHistoryFindAll;
const waBlasHistoryFindOne = async (req, res) => {
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['waBlasHistoryId'],
        requestData: req.params
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const waBlasHistory = await waBlasHistory_1.WaBlasHistoryModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                waBlasHistoryId: { [sequelize_1.Op.eq]: req.params.waBlasHistoryId }
            }
        });
        if (waBlasHistory === null) {
            const message = 'not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const response = response_1.ResponseData.default;
        response.data = waBlasHistory;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.waBlasHistoryFindOne = waBlasHistoryFindOne;
