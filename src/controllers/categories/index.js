"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.CategoryController = {
    create: create_1.createCategory,
    findAll: find_1.findAllCategory,
    findOne: find_1.findDetailCategory,
    remove: remove_1.removeCategory,
    update: update_1.updateCategory
};
