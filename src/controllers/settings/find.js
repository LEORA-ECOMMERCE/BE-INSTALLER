"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSetting = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestHandler_1 = require("../../utilities/requestHandler");
const settings_1 = require("../../models/settings");
const findSetting = async (req, res) => {
    try {
        const { settingType } = req.query ?? {};
        const whereCondition = {
            deleted: { [sequelize_1.Op.eq]: 0 }
        };
        let attributes = undefined;
        if (settingType) {
            whereCondition.settingType = { [sequelize_1.Op.eq]: settingType };
            switch (settingType) {
                case 'bank':
                    attributes = [
                        'createdAt',
                        'updatedAt',
                        'deleted',
                        'settingId',
                        'settingType',
                        'bankName',
                        'bankNumber',
                        'bankOwner'
                    ];
                    break;
                case 'qris':
                    attributes = [
                        'createdAt',
                        'updatedAt',
                        'deleted',
                        'settingId',
                        'settingType',
                        'qris'
                    ];
                    break;
                case 'general':
                    attributes = [
                        'createdAt',
                        'updatedAt',
                        'deleted',
                        'settingId',
                        'settingType',
                        'banner',
                        'whatsappNumber'
                    ];
                    break;
                case 'wa_blas':
                    attributes = [
                        'createdAt',
                        'updatedAt',
                        'deleted',
                        'settingId',
                        'settingType',
                        'waBlasToken',
                        'waBlasServer'
                    ];
                    break;
                default:
                    const message = 'invalid setting type!';
                    const response = response_1.ResponseData.error(message);
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
            }
        }
        const results = await settings_1.SettingModel.findAll({
            where: whereCondition,
            attributes,
            order: [['settingId', 'desc']]
        });
        const response = response_1.ResponseData.default;
        response.data = results;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findSetting = findSetting;
