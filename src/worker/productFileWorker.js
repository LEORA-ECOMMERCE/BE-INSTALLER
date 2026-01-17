"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const sequelize_1 = require("sequelize");
const products_1 = require("../models/products");
const fileUpload_1 = require("../models/fileUpload");
const configs_1 = require("../configs");
const logs_1 = __importDefault(require("../logs"));
const priceCalculator_1 = require("../utilities/priceCalculator");
new bullmq_1.Worker('product-file-queue', async (job) => {
    const { fileId, filePath } = job.data;
    logs_1.default.info(`[FileWorker]-Processing file upload job for file ID: ${fileId}`);
    await fileUpload_1.FileUploadModel.update({ status: 'PROCESSING' }, { where: { fileId } });
    try {
        const workbook = xlsx_1.default.readFile(filePath);
        const sheet = workbook.SheetNames[0];
        const data = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet]);
        /* ===============================
         * MAP DATA
         * =============================== */
        const products = data.map((item) => ({
            productName: item.nama,
            productDescription: item.deskripsi || '',
            productImages: item.image ? [item.image] : [],
            productPrice: Number(item.harga) || 0,
            productCategoryId: item.kategori,
            productSubCategoryId: item.subkategori,
            productCode: item.kode || null,
            productBarcode: item.barcode || null,
            productStock: Number(item.stok) || 0,
            productDiscount: Number(item.diskon) || 0,
            productSellPrice: (0, priceCalculator_1.calculateSellPrice)({
                originalPrice: Number(item.harga),
                discountPercent: Number(item.diskon)
            }),
            productWeight: Number(item.berat) || 0
        }));
        /* ===============================
         * VALIDATION - DUPLICATE IN FILE
         * =============================== */
        const codeSet = new Set();
        const barcodeSet = new Set();
        for (const product of products) {
            if (product.productCode) {
                if (codeSet.has(product.productCode)) {
                    throw new Error(`Duplicate product code di file: ${product.productCode}`);
                }
                codeSet.add(product.productCode);
            }
            if (product.productBarcode) {
                if (barcodeSet.has(product.productBarcode)) {
                    throw new Error(`Duplicate product barcode di file: ${product.productBarcode}`);
                }
                barcodeSet.add(product.productBarcode);
            }
        }
        /* ===============================
         * VALIDATION - DUPLICATE IN DB
         * =============================== */
        const codes = products.map((p) => p.productCode).filter(Boolean);
        const barcodes = products.map((p) => p.productBarcode).filter(Boolean);
        if (codes.length || barcodes.length) {
            const existingProduct = await products_1.ProductModel.findOne({
                where: {
                    deleted: 0,
                    [sequelize_1.Op.or]: [
                        ...(codes.length ? [{ productCode: { [sequelize_1.Op.in]: codes } }] : []),
                        ...(barcodes.length ? [{ productBarcode: { [sequelize_1.Op.in]: barcodes } }] : [])
                    ]
                }
            });
            if (existingProduct) {
                if (existingProduct.productCode &&
                    codes.includes(existingProduct.productCode)) {
                    throw new Error(`Product code sudah terdaftar: ${existingProduct.productCode}`);
                }
                if (existingProduct.productBarcode &&
                    barcodes.includes(existingProduct.productBarcode)) {
                    throw new Error(`Product barcode sudah terdaftar: ${existingProduct.productBarcode}`);
                }
                throw new Error('Product sudah terdaftar');
            }
        }
        /* ===============================
         * BULK INSERT
         * =============================== */
        await products_1.ProductModel.bulkCreate(products);
        await fileUpload_1.FileUploadModel.update({ status: 'SUCCESS' }, { where: { fileId } });
        fs_1.default.unlinkSync(filePath);
    }
    catch (err) {
        logs_1.default.error(`[FileWorker]-Error processing file ID ${fileId}:`, err);
        await fileUpload_1.FileUploadModel.update({
            status: 'FAILED',
            message: err.message
        }, { where: { fileId } });
    }
}, {
    connection: {
        host: configs_1.appConfigs.redis.host,
        port: configs_1.appConfigs.redis.port
    }
});
