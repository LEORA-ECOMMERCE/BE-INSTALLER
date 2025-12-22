"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingService = void 0;
const biteShipService_1 = require("./biteShipService");
const orders_1 = require("../models/orders");
const orderItems_1 = require("../models/orderItems");
const products_1 = require("../models/products");
const address_1 = require("../models/address");
const models_1 = require("../models");
const logs_1 = __importDefault(require("../logs"));
class ShippingService {
    static async createDraftFromOrder(params) {
        const { orderId } = params;
        console.log('=============order id ==============');
        console.log(orderId);
        /* ===================== 1. FETCH ORDER + ITEMS ===================== */
        const order = await orders_1.OrdersModel.findByPk(orderId);
        if (!order)
            throw new Error('ORDER_NOT_FOUND');
        if (order.orderStatus !== 'process') {
            throw new Error('INVALID_ORDER_STATUS');
        }
        if (order.orderDraftId) {
            throw new Error('DRAFT_ALREADY_EXISTS');
        }
        const [destination, origin, orderItems] = await Promise.all([
            address_1.AddressesModel.findOne({
                where: { addressUserId: order.orderUserId, addressCategory: 'user' }
            }),
            address_1.AddressesModel.findOne({
                where: { addressCategory: 'admin' }
            }),
            orderItems_1.OrderItemsModel.findAll({
                where: { orderId: order.orderId },
                include: [
                    {
                        model: products_1.ProductModel,
                        attributes: ['productDescription', 'productWeight']
                    }
                ]
            })
        ]);
        if (!destination)
            throw new Error('DESTINATION_NOT_FOUND');
        if (!origin)
            throw new Error('ORIGIN_NOT_FOUND');
        if (!orderItems.length)
            throw new Error('ORDER_ITEMS_EMPTY');
        /* ===================== 2. BUILD ITEMS ===================== */
        const items = orderItems.map((item) => ({
            name: item.productNameSnapshot,
            description: item.product?.productDescription ?? '',
            value: Number(item.productPriceSnapshot),
            quantity: item.quantity,
            weight: Math.max(item.product?.productWeight ?? 1, 1)
        }));
        const payload = {
            reference_id: order.orderReferenceId,
            shipper_contact_name: origin.addressUserName,
            shipper_contact_phone: origin.addressKontak,
            shipper_organization: 'LEORA ECOMMERCE',
            origin_contact_name: origin.addressUserName,
            origin_contact_phone: origin.addressKontak,
            origin_address: origin.addressDetail,
            origin_coordinate: {
                latitude: Number(origin.addressLatitude),
                longitude: Number(origin.addressLongitude)
            },
            destination_contact_name: destination.addressUserName,
            destination_contact_phone: destination.addressKontak,
            destination_address: destination.addressDetail,
            destination_coordinate: {
                latitude: Number(destination.addressLatitude),
                longitude: Number(destination.addressLongitude)
            },
            courier_company: order.orderCourierCompany,
            courier_type: order.orderCourierType,
            delivery_type: 'now',
            shipment_category: 'parcel',
            order_note: `Order #${order.orderReferenceId}`,
            metadata: {
                orderId: order.orderReferenceId,
                userId: order.orderUserId
            },
            items
        };
        let draftResponse = {};
        try {
            const { data } = await biteShipService_1.BiteShipService.post('/draft_orders', payload);
            draftResponse = data;
        }
        catch (err) {
            logs_1.default.error('[BITESHIP_ERROR]', err?.response?.data || err);
            throw new Error('BITESHIP_FAILED');
        }
        /* ===================== 5. SAVE DRAFT ID (DB TX) ===================== */
        await models_1.sequelize.transaction(async (tx) => {
            await order.update({ orderDraftId: draftResponse.id, orderStatus: 'draft' }, { transaction: tx });
        });
        return {
            draftOrderId: draftResponse.id,
            biteshipResponse: draftResponse
        };
    }
}
exports.ShippingService = ShippingService;
