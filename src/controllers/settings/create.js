"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSetting = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const user_1 = require("../../models/user");
const requestHandler_1 = require("../../utilities/requestHandler");
const settings_1 = require("../../models/settings");
const createSetting = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['settingType'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const checkRole = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: req.jwtPayload?.userId,
                userRole: { [sequelize_1.Op.eq]: 'superAdmin' }
            }
        });
        if (!checkRole) {
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(response_1.ResponseData.error('access denied!'));
        }
        const uniqueTypes = ['general', 'wa_blas'];
        let existingSetting = null;
        if (uniqueTypes.includes(requestBody.settingType)) {
            existingSetting = await settings_1.SettingModel.findOne({
                where: {
                    deleted: { [sequelize_1.Op.eq]: 0 },
                    settingType: { [sequelize_1.Op.eq]: requestBody.settingType }
                }
            });
        }
        const newSettingData = {
            settingType: requestBody.settingType
        };
        switch (requestBody.settingType) {
            case 'general':
                newSettingData.banner = requestBody.banner ?? null;
                newSettingData.whatsappNumber = requestBody.whatsappNumber ?? null;
                break;
            case 'wa_blas':
                newSettingData.waBlasToken = requestBody.waBlasToken ?? null;
                newSettingData.waBlasServer = requestBody.waBlasServer ?? null;
                break;
            default:
                return res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json(response_1.ResponseData.error('invalid setting type!'));
        }
        if (existingSetting) {
            await existingSetting.update(newSettingData);
            const response = response_1.ResponseData.default;
            response.data = existingSetting;
            return res.status(http_status_codes_1.StatusCodes.OK).json(response);
        }
        const createdSetting = await settings_1.SettingModel.create(newSettingData);
        const response = response_1.ResponseData.default;
        response.data = createdSetting;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createSetting = createSetting;
