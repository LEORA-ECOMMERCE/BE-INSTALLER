"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAddress = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const address_1 = require("../../models/address");
const requestHandler_1 = require("../../utilities/requestHandler");
const findAddress = async (req, res) => {
    try {
        const result = await address_1.AddressesModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                addressUserId: { [sequelize_1.Op.eq]: req.jwtPayload?.userId }
            }
        });
        const response = response_1.ResponseData.default;
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAddress = findAddress;
