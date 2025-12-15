"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddress = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const address_1 = require("../../models/address");
const requestHandler_1 = require("../../utilities/requestHandler");
const createAddress = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: [
            'addressUserName',
            'addressKontak',
            'addressDetail',
            'addressPostalCode',
            'addressProvinsi',
            'addressKabupaten',
            'addressKecamatan',
            'addressDesa'
        ],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const userId = req.body?.user?.userId;
        if (!userId) {
            const response = response_1.ResponseData.error('User ID not found in request');
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const addressCategory = req.body?.user?.userRole === 'admin' || req.body?.user?.userRole === 'superAdmin'
            ? 'admin'
            : 'user';
        const existingAddress = await address_1.AddressesModel.findOne({
            where: { addressUserId: userId }
        });
        let result;
        if (existingAddress) {
            await address_1.AddressesModel.update({
                addressUserName: requestBody.addressUserName,
                addressKontak: requestBody.addressKontak,
                addressDetail: requestBody.addressDetail,
                addressPostalCode: requestBody.addressPostalCode,
                addressProvinsi: requestBody.addressProvinsi,
                addressKabupaten: requestBody.addressKabupaten,
                addressKecamatan: requestBody.addressKecamatan,
                addressDesa: requestBody.addressDesa,
                addressCategory
            }, { where: { addressUserId: userId } });
            result = { message: 'Address updated successfully' };
        }
        else {
            const newAddress = {
                addressUserId: userId,
                addressUserName: requestBody.addressUserName,
                addressKontak: requestBody.addressKontak,
                addressDetail: requestBody.addressDetail,
                addressPostalCode: requestBody.addressPostalCode,
                addressProvinsi: requestBody.addressProvinsi,
                addressKabupaten: requestBody.addressKabupaten,
                addressKecamatan: requestBody.addressKecamatan,
                addressDesa: requestBody.addressDesa,
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
