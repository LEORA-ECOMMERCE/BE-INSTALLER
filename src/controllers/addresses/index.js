"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const findDistricts_1 = require("./findDistricts");
const findProvince_1 = require("./findProvince");
const findRegencies_1 = require("./findRegencies");
const findVillages_1 = require("./findVillages");
const remove_1 = require("./remove");
exports.AddressController = {
    create: create_1.createAddress,
    find: find_1.findAddress,
    remove: remove_1.removeAddress,
    findProvinces: findProvince_1.findProvinces,
    findRegencies: findRegencies_1.findRegencies,
    findDistricts: findDistricts_1.findDistricts,
    findVillages: findVillages_1.findVillages
};
