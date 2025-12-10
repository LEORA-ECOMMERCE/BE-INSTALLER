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
    transactionPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    transactionOrderId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    transactionUserId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    transactionOngkirPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'transactions',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
exports.TransactionsModel.hasOne(orders_1.OrdersModel, {
    sourceKey: 'transactionOrderId',
    foreignKey: 'orderId'
});
exports.TransactionsModel.hasOne(user_1.UserModel, {
    sourceKey: 'transactionUserId',
    foreignKey: 'userId'
});
