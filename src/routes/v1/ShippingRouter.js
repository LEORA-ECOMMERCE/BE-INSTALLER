"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const shipping_1 = require("../../controllers/shipping");
const ShippingRoute = (0, express_1.Router)();
ShippingRoute.use(middlewares_1.MiddleWares.authorization);
ShippingRoute.post('/rates', shipping_1.ShippingController.getShippingRates);
exports.default = ShippingRoute;
