"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const user_1 = require("../../models/user");
const requestCheker_1 = require("../../utilities/requestCheker");
const scure_password_1 = require("../../utilities/scure_password");
const generateUniqueId_1 = require("../../utilities/generateUniqueId");
const requestHandler_1 = require("../../utilities/requestHandler");
const userRegister = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['userName', 'userPassword', 'userWhatsAppNumber', 'userGender'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const user = await user_1.UserModel.findOne({
            raw: true,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                [sequelize_1.Op.or]: [{ userWhatsAppNumber: { [sequelize_1.Op.eq]: requestBody.userWhatsAppNumber } }]
            }
        });
        if (user != null) {
            const message = `Nomor ${requestBody.userWhatsAppNumber} sudah terdaftar. Silahkan gunakan yang lain.`;
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        requestBody.userPassword = (0, scure_password_1.hashPassword)(requestBody.userPassword);
        requestBody.userPartnerCode =
            (0, generateUniqueId_1.generateUniqueId)() + '-' + requestBody.userWhatsAppNumber;
        await user_1.UserModel.create(requestBody);
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.userRegister = userRegister;
