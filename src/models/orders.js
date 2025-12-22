"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const user_1 = require("./user");
const address_1 = require("./address");
const orderItems_1 = require("./orderItems");
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
    orderSubtotal: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    orderShippingFee: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    orderGrandTotal: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    orderTotalItem: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    orderCourierCompany: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    orderCourierType: {
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
    orderDraftId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    orderPaymentUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    orderPaymentToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    orderReferenceId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    orderStatus: {
        type: sequelize_1.DataTypes.ENUM('waiting', 'process', 'draft', 'delivery', 'done', 'cancel'),
        allowNull: false,
        defaultValue: 'waiting'
    }
}, {
    tableName: 'orders',
    timestamps: false,
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
/* ===================== RELATION ===================== */
exports.OrdersModel.belongsTo(user_1.UserModel, {
    foreignKey: 'orderUserId',
    targetKey: 'userId'
});
exports.OrdersModel.belongsTo(address_1.AddressesModel, {
    foreignKey: 'orderUserId',
    targetKey: 'addressUserId'
});
exports.OrdersModel.hasMany(orderItems_1.OrderItemsModel, {
    as: 'orderItems',
    foreignKey: 'orderId',
    sourceKey: 'orderId'
});
