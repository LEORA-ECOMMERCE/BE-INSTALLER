"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.FileUploadModel = _1.sequelize.define('FileUpload', {
    ...zygote_1.ZygoteModel,
    fileId: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fileName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    filePath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED'),
        allowNull: false
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'file_uploads',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
