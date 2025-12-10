"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
const updatePushToken_1 = require("./updatePushToken");
exports.NotificationController = {
    create: create_1.createNotification,
    findAll: find_1.findAllNotification,
    findOne: find_1.findDetailNotification,
    remove: remove_1.removeNofication,
    update: update_1.updateNotification,
    updatePushToken: updatePushToken_1.updatePushToken
};
