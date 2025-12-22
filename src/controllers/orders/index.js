"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const update_1 = require("./update");
exports.OrderController = {
    create: create_1.createOrder,
    findAll: find_1.findAllOrder,
    findOne: find_1.findDetailOrder,
    update: update_1.updateOrder
};
