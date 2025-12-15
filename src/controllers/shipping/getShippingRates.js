"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingRates = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestCheker_1 = require("../../utilities/requestCheker");
const products_1 = require("../../models/products");
const address_1 = require("../../models/address");
const requestHandler_1 = require("../../utilities/requestHandler");
const axios_1 = __importDefault(require("axios"));
const getShippingRates = async (req, res) => {
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['productId', 'quantity'],
        requestData: req.body
    });
    if (emptyField.length > 0) {
        const response = response_1.ResponseData.error(`invalid request body! require (${emptyField})`);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        /* ======================
         * 1. Ambil produk
         * ====================== */
        const product = await products_1.ProductModel.findOne({
            where: {
                productId: req.body.productId,
                deleted: 0
            }
        });
        if (product == null) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('product not found'));
        }
        /* ======================
         * 2. Ambil alamat toko
         * ====================== */
        const storeAddress = await address_1.AddressesModel.findOne({
            where: {
                addressCategory: 'admin',
                deleted: 0
            }
        });
        if (storeAddress == null) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('store address not found'));
        }
        /* ======================
         * 2. Ambil alamat tujuan
         * ====================== */
        const destinationAddress = await address_1.AddressesModel.findOne({
            where: {
                addressUserId: req.body.user.userId,
                addressCategory: 'user',
                deleted: 0
            }
        });
        if (destinationAddress == null) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(response_1.ResponseData.error('destination address not found'));
        }
        /* ======================
         * 3. Hitung berat & harga
         * ====================== */
        const quantity = Number(req.body.quantity);
        const items = [
            {
                name: product.productName,
                value: Number(product.productPrice),
                weight: Number(product.productWeight),
                quantity
            }
        ];
        console.log('============ship');
        console.log(storeAddress);
        console.log(destinationAddress);
        /* ======================
         * 4. Request ke Biteship
         * ====================== */
        const biteshipResponse = await axios_1.default.post(`${process.env.BITESHIP_BASE_URL}/rates/couriers`, {
            origin_postal_code: storeAddress.addressPostalCode,
            destination_postal_code: destinationAddress.addressPostalCode,
            couriers: 'jne,jnt,sicepat,anteraja',
            items: [
                {
                    name: 'Shoes',
                    description: 'Black colored size 45',
                    value: 199000,
                    length: 30,
                    width: 15,
                    height: 20,
                    weight: 200,
                    quantity: 2
                }
            ]
        }, {
            headers: {
                Authorization: `Bearer ${process.env.BITESHIP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('============ship');
        console.log(JSON.stringify(biteshipResponse));
        const response = response_1.ResponseData.default;
        response.data = biteshipResponse.data;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.getShippingRates = getShippingRates;
