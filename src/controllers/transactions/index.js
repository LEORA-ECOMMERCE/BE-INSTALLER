"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.TransactionController = {
    create: create_1.createTransaction,
    findAll: find_1.findAllTransaction,
    findOne: find_1.findDetailTransaction,
    remove: remove_1.removeTransaction,
    update: update_1.updateTransaction
};
