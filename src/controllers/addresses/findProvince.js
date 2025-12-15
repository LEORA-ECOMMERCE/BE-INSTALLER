"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProvinces = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const regionService_1 = require("../../services/regionService");
const findProvinces = async (req, res) => {
    try {
        const provinces = await regionService_1.RegionService.getProvinces();
        const response = response_1.ResponseData.default;
        response.data = provinces;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.findProvinces = findProvinces;
