"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.UserModel = _1.sequelize.define('users', {
    ...zygote_1.ZygoteModel,
    userId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userWhatsAppNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    userPhoto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    userRole: {
        type: sequelize_1.DataTypes.ENUM('user', 'courier', 'office', 'admin', 'superAdmin'),
        allowNull: false,
        defaultValue: 'user'
    },
    userCoin: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
        defaultValue: 0
    },
    userFcmId: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true
    },
    userGender: {
        type: sequelize_1.DataTypes.ENUM('pria', 'wanita'),
        allowNull: true,
        defaultValue: null
    },
    userPartnerCode: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'users',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
