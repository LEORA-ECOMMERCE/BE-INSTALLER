"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.PaymentMethodController = {
    findAll: find_1.findAllPaymentMethods,
    findDetail: find_1.findDetailPaymentMethod,
    create: create_1.createPaymentMethod,
    update: update_1.updatePaymentMethod,
    remove: remove_1.removePaymentMethod
};
