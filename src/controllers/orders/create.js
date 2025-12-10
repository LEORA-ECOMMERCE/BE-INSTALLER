"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const orders_1 = require("../../models/orders");
const products_1 = require("../../models/products");
const sequelize_1 = require("sequelize");
const address_1 = require("../../models/address");
const carts_1 = require("../../models/carts");
const requestHandler_1 = require("../../utilities/requestHandler");
const midtrans_1 = require("../../configs/midtrans");
const models_1 = require("../../models");
const createOrder = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['orderProductId', 'orderOngkirPrice'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const transaction = await models_1.sequelize.transaction();
    try {
        const address = await address_1.AddressesModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                addressUserId: { [sequelize_1.Op.eq]: req.body?.user?.userId }
            },
            transaction
        });
        if (!address) {
            await transaction.rollback();
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('alamat pengiriman tidak ditemukan!'));
        }
        const product = await products_1.ProductModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                productId: { [sequelize_1.Op.eq]: requestBody.orderProductId }
            },
            transaction
        });
        if (!product) {
            await transaction.rollback();
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('product not found!'));
        }
        requestBody.orderProductPrice = product.productPrice;
        requestBody.orderTotalItem = requestBody.orderTotalItem || 1;
        requestBody.orderTotalProductPrice =
            product.productPrice + requestBody.orderOngkirPrice;
        requestBody.orderUserId = req.body?.user?.userId;
        const newOrder = await orders_1.OrdersModel.create(requestBody, { transaction });
        const orderId = newOrder.dataValues.orderId;
        const midtransParams = {
            transaction_details: {
                order_id: String(orderId),
                gross_amount: requestBody.orderTotalProductPrice
            },
            customer_details: {
                first_name: req.body?.user?.userName ?? 'Customer',
                email: req.body?.user?.userEmail ?? 'noemail@example.com',
                phone: address.addressKontak ?? ''
            },
            item_details: [
                {
                    id: product.productId,
                    price: product.productPrice,
                    quantity: 1,
                    name: product.productName
                },
                {
                    id: 'ONGKIR',
                    price: requestBody.orderOngkirPrice,
                    quantity: 1,
                    name: 'Ongkos Kirim'
                }
            ]
        };
        let midtransResponse;
        try {
            midtransResponse = await midtrans_1.MidtransSnap.createTransaction(midtransParams);
        }
        catch (error) {
            await transaction.rollback();
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(response_1.ResponseData.error('gagal menghubungi Midtrans'));
        }
        await carts_1.CartsModel.destroy({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                cartProductId: requestBody.orderProductId
            },
            transaction
        });
        await transaction.commit();
        const response = response_1.ResponseData.default;
        response.data = {
            message: 'order created successfully',
            orderId,
            snapToken: midtransResponse.token,
            redirectUrl: midtransResponse.redirect_url
        };
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        await transaction.rollback();
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createOrder = createOrder;
