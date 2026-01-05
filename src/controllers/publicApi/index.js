"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicApiController = void 0;
const createProduct_1 = require("./createProduct");
const findAllOrderPublic_1 = require("./findAllOrderPublic");
const updateProductPublic_1 = require("./updateProductPublic");
exports.PublicApiController = {
    findAllOrderPublic: findAllOrderPublic_1.findAllOrderPublic,
    createProductPublic: createProduct_1.createProductPublic,
    updateProductPublic: updateProductPublic_1.updateProductPublic
};
