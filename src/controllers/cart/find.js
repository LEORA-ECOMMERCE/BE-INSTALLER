"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const carts_1 = require("../../models/carts");
const products_1 = require("../../models/products");
const requestHandler_1 = require("../../utilities/requestHandler");
const findAllCart = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const result = await carts_1.CartsModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                cartUserId: { [sequelize_1.Op.eq]: req.jwtPayload?.userId },
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ cartProductId: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                })
            },
            include: [
                {
                    model: products_1.ProductModel
                }
            ],
            order: [['cartId', 'desc']],
            ...(req.query.pagination === 'true' && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.default;
        response.data = page.data(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllCart = findAllCart;
