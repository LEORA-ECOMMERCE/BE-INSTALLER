"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAddress = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const address_1 = require("../../models/address");
const requestHandler_1 = require("../../utilities/requestHandler");
const addressSchema_1 = require("../../validations/addressSchema");
const createUserAddress = async (req, res) => {
    const { error, value } = (0, requestHandler_1.validateRequest)(addressSchema_1.createAddressSchema, req.body);
    if (error)
        return (0, requestHandler_1.handleValidationError)(res, error);
    try {
        const userId = req.jwtPayload.userId;
        const payload = {
            ...value,
            addressUserId: userId,
            addressCategory: 'user'
        };
        const existing = await address_1.AddressesModel.findOne({
            where: {
                addressUserId: userId,
                addressCategory: 'user'
            }
        });
        if (existing) {
            await existing.update(payload);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'User address updated' });
        }
        await address_1.AddressesModel.create(payload);
        const response = response_1.ResponseData.default;
        response.data = { message: 'User address created' };
        return res.status(201).json(response);
    }
    catch (e) {
        return (0, requestHandler_1.handleServerError)(res, e);
    }
};
exports.createUserAddress = createUserAddress;
