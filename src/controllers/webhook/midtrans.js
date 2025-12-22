"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.midtransWebhookHandler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const models_1 = require("../../models");
const orders_1 = require("../../models/orders");
const transactions_1 = require("../../models/transactions");
const response_1 = require("../../utilities/response");
const http_status_codes_1 = require("http-status-codes");
const configs_1 = require("../../configs");
const logs_1 = __importDefault(require("../../logs"));
const midtransWebhookHandler = async (req, res) => {
    const payload = req.body;
    const { order_id, transaction_status, status_code, gross_amount, payment_type, signature_key } = payload;
    console.log('===================================');
    console.log('Midtrans Webhook Payload:', payload);
    /* ===================== 1. SIGNATURE VALIDATION ===================== */
    const expectedSignature = crypto_1.default
        .createHash('sha512')
        .update(order_id + status_code + gross_amount + configs_1.appConfigs.midtrans.serverKey)
        .digest('hex');
    if (signature_key !== expectedSignature) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json(response_1.ResponseData.error('Invalid signature'));
    }
    console.log('=================================== case 1 passed======');
    /* ===================== 2. DB TRANSACTION ===================== */
    const dbTransaction = await models_1.sequelize.transaction();
    try {
        const order = await orders_1.OrdersModel.findOne({
            where: { orderReferenceId: order_id },
            transaction: dbTransaction
        });
        if (!order) {
            await dbTransaction.rollback();
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error('Order not found'));
        }
        console.log('=================================== case 2 passed======');
        const FINAL_ORDER_STATUS = ['process', 'cancel'];
        const FINAL_TRANSACTION_STATUS = ['success', 'failed', 'expire', 'cancel'];
        /* ===================== 3. MAP STATUS ===================== */
        let transactionStatus;
        let orderStatus;
        switch (transaction_status) {
            case 'capture':
            case 'settlement':
                transactionStatus = 'success';
                orderStatus = 'process';
                break;
            case 'pending':
                transactionStatus = 'pending';
                orderStatus = 'waiting';
                break;
            case 'deny':
                transactionStatus = 'failed';
                orderStatus = 'cancel';
                break;
            case 'expire':
                transactionStatus = 'expire';
                orderStatus = 'cancel';
                break;
            case 'cancel':
                transactionStatus = 'cancel';
                orderStatus = 'cancel';
                break;
            default:
                transactionStatus = 'failed';
                orderStatus = 'cancel';
                break;
        }
        console.log('=================================== case 3 passed======');
        /* ===================== 4. UPDATE ORDER ===================== */
        if (!FINAL_ORDER_STATUS.includes(order.orderStatus)) {
            await order.update({ orderStatus }, { transaction: dbTransaction });
        }
        console.log('=================================== case 4 passed======');
        /* ===================== 5. UPSERT TRANSACTION ===================== */
        if (order.orderStatus !== 'cancel') {
            console.log('=================================== case 5 passed======');
            const existingTransaction = await transactions_1.TransactionsModel.findOne({
                where: {
                    transactionOrderId: order.orderId
                },
                transaction: dbTransaction
            });
            const transactionPayload = {
                transactionOrderId: order.orderId,
                transactionUserId: order.orderUserId,
                transactionAmount: Number(order.orderGrandTotal),
                transactionOngkirPrice: Number(order.orderShippingFee),
                transactionProvider: 'midtrans',
                transactionPaymentType: payment_type,
                transactionStatus,
                transactionRawResponse: payload
            };
            console.log('=================================== case 6 passed======');
            if (existingTransaction) {
                if (!FINAL_TRANSACTION_STATUS.includes(existingTransaction.transactionStatus)) {
                    await existingTransaction.update(transactionPayload, {
                        transaction: dbTransaction
                    });
                }
                console.log('=================================== case 7 passed======');
            }
            else {
                await transactions_1.TransactionsModel.create(transactionPayload, {
                    transaction: dbTransaction
                });
            }
        }
        await dbTransaction.commit();
        console.log('=================================== case 8 passed======');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.default);
    }
    catch (error) {
        await dbTransaction.rollback();
        logs_1.default.error('Midtrans Webhook Error:', error);
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(response_1.ResponseData.error('Webhook processing failed'));
    }
};
exports.midtransWebhookHandler = midtransWebhookHandler;
