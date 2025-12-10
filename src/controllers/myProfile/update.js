"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const configs_1 = require("../../configs");
const requestHandler_1 = require("../../utilities/requestHandler");
const updateMyProfile = async (req, res) => {
    const requestBody = req.body;
    try {
        if ('userPassword' in requestBody) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            requestBody.userPassword = require('crypto')
                .createHash('sha1')
                .update(requestBody.userPassword + configs_1.appConfigs.secret.passwordEncryption)
                .digest('hex');
        }
        const newData = {
            ...(requestBody.userName?.length > 0 && {
                userName: requestBody.userName
            }),
            ...(requestBody.userPassword?.length > 0 && {
                userPassword: requestBody.userPassword
            }),
            ...(requestBody.userRole?.length > 0 && {
                userRole: requestBody.userRole
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
exports.updateMyProfile = updateMyProfile;
