"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const configs_1 = require("../../configs");
const requestHandler_1 = require("../../utilities/requestHandler");
const updateAdmin = async (req, res) => {
    const requestBody = req.body;
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.body?.user?.userId },
                [sequelize_1.Op.or]: [
                    { userRole: { [sequelize_1.Op.eq]: 'admin' } },
                    { userRole: { [sequelize_1.Op.eq]: 'superAdmin' } }
                ]
            }
        });
        if (user == null) {
            const message = 'access denied!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        if ('userPassword' in requestBody) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            requestBody.userPassword = require('crypto')
                .createHash('sha1')
                .update(requestBody.userPassword + configs_1.appConfigs.secret.passwordEncryption)
                .digest('hex');
        }
        if ('userName' in requestBody) {
            const user = await user_1.UserModel.findOne({
                where: {
                    deleted: { [sequelize_1.Op.eq]: 0 },
                    userId: { [sequelize_1.Op.not]: requestBody.userId },
                    userName: { [sequelize_1.Op.eq]: requestBody.userName }
                }
            });
            if (user != null) {
                const message = 'user name sudah terdaftar!';
                const response = response_1.ResponseData.error(message);
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
            }
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
                userId: { [sequelize_1.Op.eq]: requestBody.userId }
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
exports.updateAdmin = updateAdmin;
