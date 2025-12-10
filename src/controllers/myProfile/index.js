"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyProfileController = void 0;
const find_1 = require("./find");
const update_1 = require("./update");
exports.MyProfileController = {
    find: find_1.findMyProfile,
    update: update_1.updateMyProfile
};
