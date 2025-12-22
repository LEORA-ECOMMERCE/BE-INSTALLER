"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddress = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const address_1 = require("../../models/address");
const requestHandler_1 = require("../../utilities/requestHandler");
const addressSchema_1 = require("../../validations/addressSchema");
const createAddress = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(addressSchema_1.createAddressSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const userId = req.jwtPayload?.userId;
        if (!userId) {
            const response = response_1.ResponseData.error('User ID not found in request');
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const addressCategory = validatedData?.user?.userRole === 'admin' ||
            validatedData?.user?.userRole === 'superAdmin'
            ? 'admin'
            : 'user';
        const existingAddress = await address_1.AddressesModel.findOne({
            where: { addressUserId: userId }
        });
        let result;
        if (existingAddress) {
            await address_1.AddressesModel.update({
                addressUserName: validatedData.addressUserName,
                addressKontak: validatedData.addressKontak,
                addressDetail: validatedData.addressDetail,
                addressPostalCode: validatedData.addressPostalCode,
                addressProvinsi: validatedData.addressProvinsi,
                addressKabupaten: validatedData.addressKabupaten,
                addressKecamatan: validatedData.addressKecamatan,
                addressDesa: validatedData.addressDesa,
                addressLatitude: validatedData.addressLatitude,
                addressLongitude: validatedData.addressLongitude,
                addressCategory
            }, { where: { addressUserId: userId } });
            result = { message: 'Address updated successfully' };
        }
        else {
            const newAddress = {
                addressUserId: userId,
                addressUserName: validatedData.addressUserName,
                addressKontak: validatedData.addressKontak,
                addressDetail: validatedData.addressDetail,
                addressPostalCode: validatedData.addressPostalCode,
                addressProvinsi: validatedData.addressProvinsi,
                addressKabupaten: validatedData.addressKabupaten,
                addressKecamatan: validatedData.addressKecamatan,
                addressDesa: validatedData.addressDesa,
                addressLatitude: validatedData.addressLatitude,
                addressLongitude: validatedData.addressLongitude,
                addressCategory
            };
            await address_1.AddressesModel.create(newAddress);
            result = { message: 'Address created successfully' };
        }
        const response = response_1.ResponseData.default;
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createAddress = createAddress;
