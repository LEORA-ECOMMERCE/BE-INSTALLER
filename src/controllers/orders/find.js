"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailOrder = exports.findAllOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const requestCheker_1 = require("../../utilities/requestCheker");
const orders_1 = require("../../models/orders");
const products_1 = require("../../models/products");
const user_1 = require("../../models/user");
const address_1 = require("../../models/address");
const requestHandler_1 = require("../../utilities/requestHandler");
const orderItems_1 = require("../../models/orderItems");
const findAllOrder = async (req, res) => {
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: req.jwtPayload?.userId
            }
        });
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const result = await orders_1.OrdersModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ orderReferenceId: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                }),
                ...(Boolean(user?.dataValues.userRole === 'user') && {
                    orderUserId: { [sequelize_1.Op.eq]: req.jwtPayload?.userId }
                }),
                ...(Boolean(req.query?.orderStatus) && {
                    orderStatus: { [sequelize_1.Op.eq]: req.query.orderStatus }
                })
            },
            include: [
                {
                    model: user_1.UserModel,
                    where: {
                        deleted: { [sequelize_1.Op.eq]: 0 },
                        ...(Boolean(req.query.search) && {
                            [sequelize_1.Op.or]: [{ userName: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                        })
                    },
                    attributes: ['userName']
                },
                {
                    model: orderItems_1.OrderItemsModel,
                    as: 'orderItems',
                    include: [
                        {
                            model: products_1.ProductModel
                        }
                    ]
                }
            ],
            order: [['orderId', 'desc']],
            ...(req.query.pagination === 'true' && {
                limit: page.limit,
                offset: page.offset
            })
        });
        console.log('======order');
        const response = response_1.ResponseData.default;
        response.data = page.data(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllOrder = findAllOrder;
const findDetailOrder = async (req, res) => {
    const requestParams = req.params;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['orderId'],
        requestData: requestParams
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await orders_1.OrdersModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                orderId: { [sequelize_1.Op.eq]: requestParams.orderId }
            },
            include: [
                {
                    model: orderItems_1.OrderItemsModel,
                    as: 'orderItems',
                    include: [
                        {
                            model: products_1.ProductModel
                        }
                    ]
                },
                {
                    model: address_1.AddressesModel
                },
                {
                    model: user_1.UserModel,
                    where: {
                        deleted: { [sequelize_1.Op.eq]: 0 }
                    },
                    attributes: ['userName', 'userWhatsAppNumber', 'userCoin']
                }
            ]
        });
        const response = response_1.ResponseData.default;
        response.data = result;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailOrder = findDetailOrder;
