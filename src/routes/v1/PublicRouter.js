"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicApi_1 = require("../../controllers/publicApi");
const PublicRouter = (0, express_1.Router)();
PublicRouter.get('/orders', publicApi_1.PublicApiController.findAllOrderPublic);
PublicRouter.post('/products', publicApi_1.PublicApiController.createProductPublic);
PublicRouter.patch('/products', publicApi_1.PublicApiController.updateProductPublic);
exports.default = PublicRouter;
