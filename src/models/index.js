"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const configs_1 = require("../configs");
const dataBaseConfig = configs_1.appConfigs.dataBase.development;
exports.sequelize = new sequelize_1.Sequelize(dataBaseConfig);
