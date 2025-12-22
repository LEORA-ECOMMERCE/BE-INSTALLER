"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemsModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const products_1 = require("./products");
exports.OrderItemsModel = _1.sequelize.define('order_items', {
    ...zygote_1.ZygoteModel,
    orderItemId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    orderId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    productNameSnapshot: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    productPriceSnapshot: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    productDiscountSnapshot: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: true
    },
    productSellPriceSnapshot: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false
    }
}, {
    tableName: 'order_items',
    timestamps: false,
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
/* ===================== RELATION ===================== */
exports.OrderItemsModel.belongsTo(products_1.ProductModel, {
    foreignKey: 'productId',
    targetKey: 'productId'
});
