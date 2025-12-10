"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const orders_1 = require("../../models/orders");
const transactions_1 = require("../../models/transactions");
const uuid_1 = require("uuid");
const requestHandler_1 = require("../../utilities/requestHandler");
const products_1 = require("../../models/products");
const updateOrder = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['orderId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const order = await orders_1.OrdersModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                orderId: { [sequelize_1.Op.eq]: requestBody.orderId }
            }
        });
        if (order == null) {
            const message = 'not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const newData = {
            ...(requestBody?.orderStatus?.length > 0 && {
                orderStatus: requestBody?.orderStatus
            })
        };
        await orders_1.OrdersModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                orderId: { [sequelize_1.Op.eq]: requestBody.orderId }
            }
        });
        const transactionPayload = {
            transactionId: (0, uuid_1.v4)(),
            transactionPrice: order.dataValues.orderProductPrice,
            transactionOrderId: order.dataValues.orderId,
            transactionUserId: req.body?.user?.userId,
            transactionOngkirPrice: order.dataValues?.orderOngkirPrice
        };
        await transactions_1.TransactionsModel.create(transactionPayload);
        const product = await products_1.ProductModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                productId: { [sequelize_1.Op.eq]: order.orderProductId }
            }
        });
        if (product) {
            product.productStock = product.productStock - order.orderTotalItem;
            product.productTotalSale = product.productTotalSale + order.orderTotalItem;
            await product.save();
        }
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateOrder = updateOrder;
