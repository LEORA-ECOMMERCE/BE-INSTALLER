"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const products_1 = require("./products");
const user_1 = require("./user");
const address_1 = require("./address");
exports.OrdersModel = _1.sequelize.define('orders', {
    ...zygote_1.ZygoteModel,
    orderId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    orderUserId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    orderProductId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    orderProductPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    orderTotalProductPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    orderOngkirPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    orderTotalItem: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    orderCourierCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    orderCourierService: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    orderTrackingId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    orderWaybillId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    orderStatus: {
        type: sequelize_1.DataTypes.ENUM('waiting', 'process', 'delivery', 'done', 'cancel'),
        allowNull: false,
        defaultValue: 'waiting'
    },
    orderTransferBankImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'orders',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
exports.OrdersModel.hasOne(products_1.ProductModel, {
    sourceKey: 'orderProductId',
    foreignKey: 'productId'
});
exports.OrdersModel.hasOne(user_1.UserModel, {
    sourceKey: 'orderUserId',
    foreignKey: 'userId'
});
exports.OrdersModel.hasOne(address_1.AddressesModel, {
    sourceKey: 'orderUserId',
    foreignKey: 'addressUserId'
});
