"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPromotion = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const products_1 = require("../../models/products");
const categories_1 = require("../../models/categories");
const requestHandler_1 = require("../../utilities/requestHandler");
const findAllPromotion = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(parseInt(req.query.page) ?? 0, parseInt(req.query.size) ?? 10);
        const result = await products_1.ProductModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                productIsHighlight: true,
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ productName: { [sequelize_1.Op.like]: `%${req.query.search}%` } }]
                }),
                ...(Boolean(req.query.productCategoryId) && {
                    productCategoryId: { [sequelize_1.Op.eq]: req.query.productCategoryId }
                }),
                ...(Boolean(req.query.productSubCategoryId) && {
                    productSubCategoryId: { [sequelize_1.Op.eq]: req.query.productSubCategoryId }
                })
            },
            include: [{ model: categories_1.CategoryModel }],
            order: [['productId', 'desc']],
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
exports.findAllPromotion = findAllPromotion;
