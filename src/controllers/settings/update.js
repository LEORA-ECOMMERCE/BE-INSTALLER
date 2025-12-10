"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSetting = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const requestHandler_1 = require("../../utilities/requestHandler");
const settings_1 = require("../../models/settings");
const updateSetting = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['settingId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        // const checkRole = await UserModel.findOne({
        //   where: {
        //     deleted: { [Op.eq]: 0 },
        //     userId: req.body?.user?.userId,
        //     userRole: { [Op.eq]: 'superAdmin' }
        //   }
        // })
        // if (checkRole == null) {
        //   const message = 'access denied!'
        //   const response = ResponseData.error(message)
        //   return res.status(StatusCodes.FORBIDDEN).json(response)
        // }
        const existingSetting = await settings_1.SettingModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                settingId: { [sequelize_1.Op.eq]: requestBody.settingId }
            }
        });
        if (existingSetting == null) {
            const message = 'setting not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const updatableFields = [
            'bankName',
            'bankNumber',
            'bankOwner',
            'qris',
            'banner',
            'whatsappNumber',
            'waBlasToken',
            'waBlasServer'
        ];
        const newData = {};
        for (const key of updatableFields) {
            const value = requestBody[key];
            if (value !== undefined && value !== null && value !== '') {
                ;
                newData[key] = value;
            }
        }
        await settings_1.SettingModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                settingId: { [sequelize_1.Op.eq]: requestBody.settingId }
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
exports.updateSetting = updateSetting;
