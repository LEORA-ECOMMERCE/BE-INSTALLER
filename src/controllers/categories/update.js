"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const categories_1 = require("../../models/categories");
const requestHandler_1 = require("../../utilities/requestHandler");
const updateCategory = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['categoryId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await categories_1.CategoryModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                categoryId: { [sequelize_1.Op.eq]: requestBody.categoryId }
            }
        });
        if (result == null) {
            const message = 'not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const newData = {
            ...(requestBody?.categoryIcon &&
                requestBody.categoryIcon.toString().length > 0 && {
                categoryIcon: requestBody.categoryIcon
            }),
            ...(requestBody.categoryName.length > 0 && {
                categoryName: requestBody.categoryName
            })
        };
        await categories_1.CategoryModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                categoryId: { [sequelize_1.Op.eq]: requestBody.categoryId }
            }
        });
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateCategory = updateCategory;
