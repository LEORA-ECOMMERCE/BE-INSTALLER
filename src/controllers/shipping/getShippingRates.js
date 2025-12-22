"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingRates = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const products_1 = require("../../models/products");
const address_1 = require("../../models/address");
const requestHandler_1 = require("../../utilities/requestHandler");
const biteShipService_1 = require("../../services/biteShipService");
const getShippingRates = async (req, res) => {
    try {
        /* ======================
         * 1. VALIDATE BODY
         * ====================== */
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(response_1.ResponseData.error('Request body must be a non-empty array'));
        }
        const payloadItems = req.body;
        for (const item of payloadItems) {
            if (!item.productId || !item.quantity) {
                return res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json(response_1.ResponseData.error('Each item must have productId and quantity'));
            }
        }
        /* ======================
         * 2. FETCH PRODUCTS
         * ====================== */
        const productIds = payloadItems.map((item) => item.productId);
        const products = await products_1.ProductModel.findAll({
            where: {
                productId: productIds,
                deleted: 0
            }
        });
        if (products.length !== payloadItems.length) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('One or more products not found'));
        }
        /* ======================
         * 3. FETCH ADDRESSES
         * ====================== */
        const originAddress = await address_1.AddressesModel.findOne({
            where: {
                addressCategory: 'admin',
                deleted: 0
            }
        });
        if (!originAddress) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('Store address not found'));
        }
        const destinationAddress = await address_1.AddressesModel.findOne({
            where: {
                addressUserId: req.jwtPayload?.userId,
                addressCategory: 'user',
                deleted: 0
            }
        });
        if (!destinationAddress) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('Destination address not found'));
        }
        /* ======================
         * 4. BUILD ITEMS
         * ====================== */
        const items = payloadItems.map((payloadItem) => {
            const product = products.find((p) => p.productId === payloadItem.productId);
            return {
                name: product.productName,
                value: Number(product.productPrice),
                weight: Number(product.productWeight),
                quantity: Number(payloadItem.quantity)
            };
        });
        /* ======================
         * 5. REQUEST TO BITESHIP
         * ====================== */
        const biteshipResponse = await biteShipService_1.BiteShipService.post('/rates/couriers', {
            origin_latitude: Number(originAddress.addressLatitude),
            origin_longitude: Number(originAddress.addressLongitude),
            destination_latitude: Number(destinationAddress.addressLatitude),
            destination_longitude: Number(destinationAddress.addressLongitude),
            couriers: 'gojek,grab',
            items
        });
        const response = response_1.ResponseData.default;
        response.data = biteshipResponse.data;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.getShippingRates = getShippingRates;
