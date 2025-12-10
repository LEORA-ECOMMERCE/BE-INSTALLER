"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const products_1 = require("./products");
exports.CartsModel = _1.sequelize.define('carts', {
    ...zygote_1.ZygoteModel,
    cartId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cartUserId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cartProductId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cartTotalItem: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'carts',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
exports.CartsModel.hasOne(products_1.ProductModel, {
    sourceKey: 'cartProductId',
    foreignKey: 'productId'
});
