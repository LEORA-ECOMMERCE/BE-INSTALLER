"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.CategoryModel = _1.sequelize.define('category', {
    ...zygote_1.ZygoteModel,
    categoryId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    categoryReference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    categoryName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    categoryIcon: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    categoryType: {
        type: sequelize_1.DataTypes.ENUM('parent', 'child'),
        allowNull: false,
        defaultValue: 'parent'
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'categories',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
