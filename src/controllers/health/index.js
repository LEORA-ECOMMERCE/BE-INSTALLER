"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckController = exports.mainController = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const mainController = async (req, res) => {
    try {
        const data = {
            about_me: 'Welcome to LEORA E-COMMERCE API sV1'
        };
        const response = response_1.ResponseData.default;
        response.data = data;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const response = response_1.ResponseData.error(`unable to process request! error ${error.message}`);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.mainController = mainController;
const healthCheckController = async (req, res) => {
    try {
        const response = response_1.ResponseData.default;
        response.data = { status: 'ok', uptime: process.uptime() };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const response = response_1.ResponseData.error(`Health check failed: ${error.message}`);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.healthCheckController = healthCheckController;
