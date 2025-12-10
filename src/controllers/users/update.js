"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const requestHandler_1 = require("../../utilities/requestHandler");
const updateUser = async (req, res) => {
    const requestBody = req.body;
    try {
        const result = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.body?.user?.userId }
            }
        });
        if (result == null) {
            const message = 'user not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const newData = {
            ...(requestBody?.userName?.length > 0 && {
                userName: requestBody?.userName
            }),
            ...(requestBody?.userPassword?.length > 0 && {
                userPassword: requestBody?.userPassword
            }),
            ...(requestBody?.userWhatsAppNumber?.length > 0 && {
                userWhatsAppNumber: requestBody?.userWhatsAppNumber
            }),
            ...(requestBody?.userPhoto?.length > 0 && {
                userPhoto: requestBody?.userPhoto
            }),
            ...(requestBody?.userCoin > 0 && {
                userCoin: requestBody?.userCoin
            }),
            ...(requestBody?.userRole?.length > 0 && {
                userRole: requestBody?.userRole
            })
        };
        await user_1.UserModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.body?.user?.userId }
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
exports.updateUser = updateUser;
