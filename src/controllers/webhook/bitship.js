"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitshipWebhookHandler = void 0;
const orders_1 = require("../../models/orders");
const response_1 = require("../../utilities/response");
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const bitshipWebhookHandler = async (req, res) => {
    const payload = req.body;
    try {
        console.log('====pas 1');
        if (payload && payload.courier_waybill_id) {
            const order = await orders_1.OrdersModel.findOne({
                where: {
                    deleted: 0,
                    orderWaybillId: payload?.courier_waybill_id
                }
            });
            if (order) {
                if (payload.status === 'delivered') {
                    order.orderStatus = 'done';
                    order.save();
                }
            }
        }
        else {
            logs_1.default.warn('[BITESHIP WEBHOOK] - payload is empty');
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.default);
    }
    catch (error) {
        logs_1.default.error('Bitship Webhook Error:', error);
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(response_1.ResponseData.error('Webhook processing failed'));
    }
};
exports.bitshipWebhookHandler = bitshipWebhookHandler;
