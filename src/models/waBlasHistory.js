"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaBlasHistoryModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.WaBlasHistoryModel = _1.sequelize.define('wa_blas_history', {
    ...zygote_1.ZygoteModel,
    waBlasHistoryId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    waBlasHistoryUserId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    waBlasHistoryUserName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    waBlasHistoryUserPhone: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    waBlasHistoryTitle: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    waBlasHistoryMessage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    waBlasStatus: {
        type: sequelize_1.DataTypes.ENUM('success', 'fail'),
        allowNull: false,
        defaultValue: 'success'
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'wa_blas_history',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB',
    hooks: {
        beforeCreate: (record, options) => {
            const now = (0, moment_1.default)().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss');
            record.createdAt = now;
            record.updatedAt = null;
        },
        beforeUpdate: (record, options) => {
            const now = (0, moment_1.default)().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss');
            record.updatedAt = now;
        }
    }
});
