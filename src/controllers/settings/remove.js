"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSetting = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestHandler_1 = require("../../utilities/requestHandler");
const settings_1 = require("../../models/settings");
const user_1 = require("../../models/user");
const removeSetting = async (req, res) => {
    try {
        const { settingId } = req.params;
        if (!settingId) {
            const message = 'invalid request parameter! require (settingId)';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const checkRole = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: req.body?.user?.userId,
                userRole: { [sequelize_1.Op.eq]: 'superAdmin' }
            }
        });
        if (checkRole == null) {
            const message = 'access denied!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(response);
        }
        const findSetting = await settings_1.SettingModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                settingId: { [sequelize_1.Op.eq]: settingId }
            }
        });
        if (!findSetting) {
            const message = 'setting not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        await settings_1.SettingModel.update({ deleted: 1 }, {
            where: {
                settingId: { [sequelize_1.Op.eq]: settingId }
            }
        });
        const response = response_1.ResponseData.default;
        response.data = { message: 'setting deleted successfully!' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removeSetting = removeSetting;
