"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const login_1 = require("./login");
const update_1 = require("./update");
exports.AdminController = {
    create: create_1.createAdmin,
    find: find_1.findDetailAdmin,
    allAdmin: find_1.findAllAdmin,
    update: update_1.updateAdmin,
    login: login_1.login
};
