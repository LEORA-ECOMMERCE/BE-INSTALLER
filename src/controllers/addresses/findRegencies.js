"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRegencies = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const regionService_1 = require("../../services/regionService");
const findRegencies = async (req, res) => {
    try {
        const { provinceId } = req.params;
        const regencies = await regionService_1.RegionService.getRegencies(provinceId);
        const response = response_1.ResponseData.default;
        response.data = regencies;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.findRegencies = findRegencies;
