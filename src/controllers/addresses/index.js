"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
exports.AddressController = {
    create: create_1.createAddress,
    find: find_1.findAddress,
    remove: remove_1.removeAddress
};
