"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShippingDraft = void 0;
const orderSchema_1 = require("../../validations/orderSchema");
const requestHandler_1 = require("../../utilities/requestHandler");
const ShippingService_1 = require("../../services/ShippingService");
const createShippingDraft = async (req, res) => {
    const { error, value } = (0, requestHandler_1.validateRequest)(orderSchema_1.createDraftFromOrderSchema, req.body);
    if (error)
        return (0, requestHandler_1.handleValidationError)(res, error);
    try {
        const result = await ShippingService_1.ShippingService.createDraftFromOrder({
            orderId: value.orderId
        });
        return res.status(201).json({
            success: true,
            message: 'Draft order created successfully',
            data: result
        });
    }
    catch (err) {
        switch (err.message) {
            case 'ORDER_NOT_FOUND':
                return res.status(404).json({ message: 'Order not found' });
            case 'INVALID_ORDER_STATUS':
                return res.status(400).json({
                    message: 'Draft can only be created when order status is PROCESS'
                });
            case 'DRAFT_ALREADY_EXISTS':
                return res.status(409).json({
                    message: 'Draft order already exists'
                });
            case 'DESTINATION_NOT_FOUND':
                return res.status(400).json({ message: 'User address not found' });
            case 'ORIGIN_NOT_FOUND':
                return res.status(400).json({ message: 'Admin address not found' });
            case 'ORDER_ITEMS_EMPTY':
                return res.status(400).json({ message: 'Order items empty' });
            case 'BITESHIP_FAILED':
                return res.status(502).json({
                    message: 'Failed to create draft order from shipping provider'
                });
            default:
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.createShippingDraft = createShippingDraft;
