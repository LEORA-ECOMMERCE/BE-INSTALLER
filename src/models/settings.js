"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModel = void 0;
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.SettingModel = _1.sequelize.define('settings', {
    ...zygote_1.ZygoteModel,
    settingId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    settingType: {
        type: sequelize_1.DataTypes.ENUM('general', 'wa_blas'),
        allowNull: false
    },
    banner: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    },
    whatsappNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    waBlasToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    waBlasServer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'settings',
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB',
    hooks: {
        beforeCreate: (record) => {
            const now = (0, moment_1.default)().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss');
            record.createdAt = now;
            record.updatedAt = null;
        },
        beforeUpdate: (record) => {
            const now = (0, moment_1.default)().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss');
            record.updatedAt = now;
        }
    }
});
