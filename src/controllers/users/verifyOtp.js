"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const redis_1 = __importDefault(require("../../configs/redis"));
const userSchema_1 = require("../../validations/userSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const verifyOtp = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(userSchema_1.verifyOtpSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details
            .map((x) => x.message)
            .join(', ')}`;
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const storedOtp = await redis_1.default.get(`otp:${req.body.otpCode}`);
        if (!storedOtp || storedOtp !== req.body.otpCode) {
            const message = 'Invalid or expired OTP!';
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
        }
        await redis_1.default.del(`otp:${req.body.otpCode}`);
        const response = response_1.ResponseData.default;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.verifyOtp = verifyOtp;
