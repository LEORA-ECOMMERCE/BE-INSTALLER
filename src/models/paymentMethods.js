"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodModel = void 0;
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.PaymentMethodModel = _1.sequelize.define('PaymentMethod', {
    ...zygote_1.ZygoteModel,
    paymentMethodId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    paymentMethodType: {
        type: sequelize_1.DataTypes.ENUM('bank', 'qris'),
        allowNull: false
    },
    paymentMethodBankName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    paymentMethodBankNumber: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    paymentMethodBankOwner: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    paymentMethodQris: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    paymentMethodDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'payment_methods',
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
