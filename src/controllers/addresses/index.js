"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const createAdminAddress_1 = require("./createAdminAddress");
const createUserAddress_1 = require("./createUserAddress");
const findAdminAddress_1 = require("./findAdminAddress");
const findDistricts_1 = require("./findDistricts");
const findProvince_1 = require("./findProvince");
const findRegencies_1 = require("./findRegencies");
const findUserAddress_1 = require("./findUserAddress");
const findVillages_1 = require("./findVillages");
const remove_1 = require("./remove");
exports.AddressController = {
    createUserAddress: createUserAddress_1.createUserAddress,
    createAdminAddress: createAdminAddress_1.createAdminAddress,
    remove: remove_1.removeAddress,
    findUserAddress: findUserAddress_1.findUserAddress,
    findAdminAddress: findAdminAddress_1.findAdminAddress,
    findProvinces: findProvince_1.findProvinces,
    findRegencies: findRegencies_1.findRegencies,
    findDistricts: findDistricts_1.findDistricts,
    findVillages: findVillages_1.findVillages
};
