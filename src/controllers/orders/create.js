"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
const orders_1 = require("../../models/orders");
const orderItems_1 = require("../../models/orderItems");
const products_1 = require("../../models/products");
const address_1 = require("../../models/address");
const carts_1 = require("../../models/carts");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const midtrans_1 = require("../../configs/midtrans");
const orderSchema_1 = require("../../validations/orderSchema");
const createOrder = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(orderSchema_1.createOrderSchema, req.body);
    const { items, orderShippingFee, orderCourierCompany, orderCourierType } = validatedData;
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const t = await models_1.sequelize.transaction();
    try {
        /* 1 CEK ALAMAT */
        const address = await address_1.AddressesModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                addressUserId: req.jwtPayload?.userId,
                addressCategory: 'user'
            },
            transaction: t
        });
        if (!address) {
            await t.rollback();
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('alamat pengiriman tidak ditemukan'));
        }
        /* 2 AMBIL PRODUK */
        const productIds = items.map((i) => i.productId);
        const products = await products_1.ProductModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                productId: { [sequelize_1.Op.in]: productIds }
            },
            transaction: t
        });
        if (products.length !== items.length) {
            await t.rollback();
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('salah satu produk tidak ditemukan'));
        }
        /* 3 HITUNG TOTAL */
        let orderSubtotal = 0;
        let orderTotalItem = 0;
        const orderItemsPayload = items.map((item) => {
            const product = products.find((p) => String(p.productId) === String(item.productId));
            const quantity = item.quantity;
            const price = Number(product.productSellPrice);
            const totalPrice = price * quantity;
            orderSubtotal += totalPrice;
            orderTotalItem += quantity;
            return {
                productId: product.productId,
                productNameSnapshot: product.productName,
                productPriceSnapshot: price,
                productDiscountSnapshot: product.productDiscount,
                productSellPriceSnapshot: product.productSellPrice,
                quantity,
                totalPrice
            };
        });
        /* 4 CREATE ORDER HEADER */
        const orderPayload = {
            orderUserId: req.jwtPayload?.userId,
            orderSubtotal,
            orderShippingFee,
            orderGrandTotal: orderSubtotal + orderShippingFee,
            orderTotalItem,
            orderCourierCompany,
            orderCourierType
        };
        const order = await orders_1.OrdersModel.create(orderPayload, { transaction: t });
        /* 5 CREATE ORDER ITEMS */
        for (const item of orderItemsPayload) {
            const payload = {
                orderId: order.orderId,
                productId: item.productId,
                productNameSnapshot: item.productNameSnapshot,
                productPriceSnapshot: item.productPriceSnapshot,
                productDiscountSnapshot: item.productDiscountSnapshot,
                productSellPriceSnapshot: item.productSellPriceSnapshot,
                quantity: item.quantity,
                totalPrice: item.totalPrice
            };
            await orderItems_1.OrderItemsModel.create(payload, { transaction: t });
        }
        const orderReferenceId = `ORDER-${order.orderId}-${Date.now()}`;
        /* 6 MIDTRANS */
        const midtransParams = {
            transaction_details: {
                order_id: orderReferenceId,
                gross_amount: order.orderGrandTotal
            },
            customer_details: {
                first_name: address.addressUserName,
                phone: address.addressKontak
            },
            item_details: [
                ...orderItemsPayload.map((item) => ({
                    id: String(item.productId),
                    price: item.productPriceSnapshot,
                    discount: item.productDiscountSnapshot,
                    sellPrice: item.productSellPriceSnapshot,
                    quantity: item.quantity,
                    name: item.productNameSnapshot
                })),
                {
                    id: 'SHIPPING',
                    price: orderShippingFee,
                    quantity: 1,
                    name: 'Shipping Fee'
                }
            ]
        };
        const midtransResponse = await midtrans_1.MidtransSnap.createTransaction(midtransParams);
        /* ===================== 7. SAVE PAYMENT URL ===================== */
        await order.update({
            orderPaymentUrl: midtransResponse.redirect_url,
            orderPaymentToken: midtransResponse.token,
            orderReferenceId: orderReferenceId
        }, { transaction: t });
        /* ===================== 8. CLEAR CART =============================*/
        await carts_1.CartsModel.destroy({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                cartUserId: req.jwtPayload?.userId,
                cartProductId: { [sequelize_1.Op.in]: productIds }
            },
            transaction: t
        });
        await t.commit();
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ...response_1.ResponseData.default,
            data: {
                orderId: order.orderId,
                snapToken: midtransResponse.token,
                redirectUrl: midtransResponse.redirect_url
            }
        });
    }
    catch (error) {
        await t.rollback();
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.createOrder = createOrder;
