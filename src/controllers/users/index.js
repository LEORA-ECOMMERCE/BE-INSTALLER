"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const find_1 = require("./find");
const login_1 = require("./login");
const register_1 = require("./register");
const remove_1 = require("./remove");
const requestOtp_1 = require("./requestOtp");
const update_1 = require("./update");
const updateCoin_1 = require("./updateCoin");
const updatePassword_1 = require("./updatePassword");
const verifyOtp_1 = require("./verifyOtp");
exports.UsersController = {
    login: login_1.userLogin,
    register: register_1.userRegister,
    findAll: find_1.findAllUser,
    findDetailUser: find_1.findDetailUser,
    update: update_1.updateUser,
    remove: remove_1.removeUser,
    updateUserCoin: updateCoin_1.updateUserCoin,
    updatePassword: updatePassword_1.updatePassword,
    requestOtp: requestOtp_1.requestOtp,
    verifyOtp: verifyOtp_1.verifyOtp
};
