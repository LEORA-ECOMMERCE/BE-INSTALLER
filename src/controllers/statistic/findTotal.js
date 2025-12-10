"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTotal = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const products_1 = require("../../models/products");
const orders_1 = require("../../models/orders");
const user_1 = require("../../models/user");
const requestHandler_1 = require("../../utilities/requestHandler");
const findTotal = async (req, res) => {
    try {
        const totalProduct = await products_1.ProductModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const totalOrder = await orders_1.OrdersModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                orderStatus: { [sequelize_1.Op.not]: 'done' }
            }
        });
        const totalTransaction = await orders_1.OrdersModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                orderStatus: { [sequelize_1.Op.eq]: 'done' }
            }
        });
        const totalCustomer = await user_1.UserModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userRole: { [sequelize_1.Op.eq]: 'user' }
            }
        });
        const totalUserPria = await user_1.UserModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userGender: { [sequelize_1.Op.eq]: 'pria' },
                userRole: { [sequelize_1.Op.eq]: 'user' }
            }
        });
        const totalUserWanita = await user_1.UserModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userGender: { [sequelize_1.Op.eq]: 'wanita' },
                userRole: { [sequelize_1.Op.eq]: 'user' }
            }
        });
        const response = response_1.ResponseData.default;
        response.data = {
            totalProduct,
            totalOrder,
            totalTransaction,
            totalCustomer,
            totalUserPria,
            totalUserWanita
        };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findTotal = findTotal;
