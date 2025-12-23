"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const findHighlightProduct_1 = require("./findHighlightProduct");
const remove_1 = require("./remove");
const update_1 = require("./update");
const upload_1 = require("./upload");
const uploadHistory_1 = require("./uploadHistory");
exports.ProductController = {
    create: create_1.createProduct,
    findAll: find_1.findAllProducts,
    findOne: find_1.findDetailProduct,
    remove: remove_1.removeProduct,
    update: update_1.updateProduct,
    upload: upload_1.uploadProductExcel,
    uploadHistories: uploadHistory_1.uploadHistories,
    findAllHightlightProducts: findHighlightProduct_1.findAllHightlightProducts
};
