"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const categories_1 = require("./categories");
exports.ProductModel = _1.sequelize.define('products', {
    ...zygote_1.ZygoteModel,
    productId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    productImages: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    productDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    productPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    productDiscount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    productSellPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true
    },
    productCategoryId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    productSubCategoryId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    productCode: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    productTotalSale: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    productStock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    productWeight: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    productIsHighlight: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    productIsVisible: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    productBarcode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    productUnit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'products',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
exports.ProductModel.hasOne(categories_1.CategoryModel, {
    sourceKey: 'productCategoryId',
    foreignKey: 'categoryId'
});
