"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerError = exports.handleValidationError = exports.validateRequest = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("./response");
const logs_1 = __importDefault(require("../logs"));
const validateRequest = (schema, requestData) => {
    return schema.validate(requestData, { abortEarly: false });
};
exports.validateRequest = validateRequest;
function handleValidationError(res, error) {
    const message = `Invalid request! ${error.details.map((x) => x.message).join(', ')}`;
    logs_1.default.warn(message);
    const response = response_1.ResponseData.error({ message });
    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
}
exports.handleValidationError = handleValidationError;
function handleServerError(res, err) {
    if (err instanceof Error) {
        const message = `Unable to process request!: ${err.message}`;
        logs_1.default.error(message, { stack: err.stack });
        const response = response_1.ResponseData.error('Maaf, tidak dapat memproses permintaan!');
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    const message = 'Maaf, tidak dapat memproses permintaan!';
    logs_1.default.error(message);
    const response = response_1.ResponseData.error(message);
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
}
exports.handleServerError = handleServerError;
