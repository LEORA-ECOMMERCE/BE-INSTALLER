"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNofication = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const notifications_1 = require("../../models/notifications");
const requestHandler_1 = require("../../utilities/requestHandler");
const removeNofication = async (req, res) => {
    const requestQuery = req.query;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['notificationId'],
        requestData: requestQuery
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await notifications_1.NotificationModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                notificationId: { [sequelize_1.Op.eq]: requestQuery.notificationId }
            }
        });
        if (result == null) {
            const message = 'notification not found!';
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
exports.removeNofication = removeNofication;
