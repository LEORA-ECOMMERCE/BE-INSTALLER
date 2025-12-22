"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const orders_1 = require("./orders");
const user_1 = require("./user");
exports.TransactionsModel = _1.sequelize.define('transactions', {
    ...zygote_1.ZygoteModel,
    transactionId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    transactionOrderId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    transactionUserId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    transactionAmount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    transactionOngkirPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    transactionProvider: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'midtrans'
    },
    transactionPaymentType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    transactionSnapToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    transactionStatus: {
        type: sequelize_1.DataTypes.ENUM('pending', 'success', 'failed', 'expire', 'cancel'),
        allowNull: false,
        defaultValue: 'pending'
    },
    transactionRawResponse: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'transactions',
    timestamps: false,
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
/* ================= RELATIONS ================= */
exports.TransactionsModel.belongsTo(orders_1.OrdersModel, {
    foreignKey: 'transactionOrderId'
});
exports.TransactionsModel.belongsTo(user_1.UserModel, {
    foreignKey: 'transactionUserId'
});
