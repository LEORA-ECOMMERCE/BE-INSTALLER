"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.SettingsController = {
    findSetting: find_1.findSetting,
    createSetting: create_1.createSetting,
    updateSetting: update_1.updateSetting,
    removeSetting: remove_1.removeSetting
};
