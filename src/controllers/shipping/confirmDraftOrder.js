"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmDraftOrder = void 0;
const models_1 = require("../../models");
const orders_1 = require("../../models/orders");
const biteShipService_1 = require("../../services/biteShipService");
const orderSchema_1 = require("../../validations/orderSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const confirmDraftOrder = async (req, res) => {
    const { error, value } = (0, requestHandler_1.validateRequest)(orderSchema_1.confirmDraftOrderSchema, req.body);
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
        if (!order.orderDraftId) {
            return res.status(400).json({
                success: false,
                message: 'Draft order not found'
            });
        }
        if (order.orderStatus !== 'draft') {
            return res.status(400).json({
                success: false,
                message: 'Order must be in DRAFT status'
            });
        }
        /* ===================== 2. CONFIRM DRAFT (BITESHIP) ===================== */
        let confirmResponse = {};
        try {
            const { data } = await biteShipService_1.BiteShipService.post(`/draft_orders/${order.orderDraftId}/confirm`);
            confirmResponse = data;
        }
        catch (err) {
            console.error('[BITESHIP_CONFIRM_ERROR]', err?.response?.data || err);
            return res.status(502).json({
                success: false,
                message: 'Failed to confirm draft order'
            });
        }
        /* ===================== 3. UPDATE ORDER ===================== */
        await models_1.sequelize.transaction(async (tx) => {
            await order.update({
                orderStatus: 'delivery',
                orderWaybillId: confirmResponse?.courier?.waybill_id,
                orderTrackingId: confirmResponse?.courier?.tracking_id
            }, { transaction: tx });
        });
        /* ===================== 4. RESPONSE ===================== */
        return res.status(200).json({
            success: true,
            message: 'Draft order confirmed & shipment created',
            data: {
                orderId: order.orderId,
                waybillId: confirmResponse.waybill_id,
                trackingId: confirmResponse.tracking_id,
                courier: confirmResponse.courier
            }
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
exports.confirmDraftOrder = confirmDraftOrder;
