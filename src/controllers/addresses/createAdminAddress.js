"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminAddress = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const address_1 = require("../../models/address");
const requestHandler_1 = require("../../utilities/requestHandler");
const addressSchema_1 = require("../../validations/addressSchema");
const createAdminAddress = async (req, res) => {
    if (!['admin', 'superAdmin'].includes(req.jwtPayload.userRole)) {
        return res.status(403).json(response_1.ResponseData.error('Forbidden'));
    }
    const { error, value } = (0, requestHandler_1.validateRequest)(addressSchema_1.createAddressSchema, req.body);
    if (error)
        return (0, requestHandler_1.handleValidationError)(res, error);
    try {
        const existing = await address_1.AddressesModel.findOne({
            where: { addressCategory: 'admin' }
        });
        const payload = {
            ...value,
            addressUserId: req.jwtPayload?.userId,
            addressCategory: 'admin'
        };
        if (existing) {
            await existing.update(payload);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "'Admin address updated" });
        }
        await address_1.AddressesModel.create(payload);
        const response = response_1.ResponseData.default;
        response.data = { message: 'Admin address created' };
        return res.status(201).json(response);
    }
    catch (e) {
        return (0, requestHandler_1.handleServerError)(res, e);
    }
};
exports.createAdminAddress = createAdminAddress;
