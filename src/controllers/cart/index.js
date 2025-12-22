"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
exports.CartController = {
    create: create_1.createCart,
    findAll: find_1.findAllCart,
    remove: remove_1.removeCart
};
