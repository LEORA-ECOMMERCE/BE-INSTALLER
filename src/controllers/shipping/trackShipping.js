"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackShipment = void 0;
const orders_1 = require("../../models/orders");
const biteShipService_1 = require("../../services/biteShipService");
const orderSchema_1 = require("../../validations/orderSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const trackShipment = async (req, res) => {
    const { error, value } = (0, requestHandler_1.validateRequest)(orderSchema_1.trackOrderSchema, req.query);
    if (error)
        return (0, requestHandler_1.handleValidationError)(res, error);
    const { orderId } = value;
    try {
        /* ===================== 1. GET ORDER ===================== */
        const order = await orders_1.OrdersModel.findByPk(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        if (!order.orderWaybillId || !order.orderCourierCompany) {
            return res.status(400).json({
                success: false,
                message: 'Shipment data not available'
            });
        }
        const { data } = await biteShipService_1.BiteShipService.get(`/trackings/${order.orderWaybillId}/couriers/${order.orderCourierCompany}`);
        /* ===================== 3. RESPONSE ===================== */
        const response = response_1.ResponseData.default;
        response.data = data;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        logs_1.default.error('[BITESHIP_TRACKING_ERROR]', serverError);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
exports.trackShipment = trackShipment;
