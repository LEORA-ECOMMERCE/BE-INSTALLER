"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductImagesFromExcel = void 0;
const normalizeString = (value) => {
    return value
        .toLowerCase()
        .replace(/\.(jpg|jpeg|png|webp)$/g, '') // hapus ekstensi
        .replace(/[^a-z0-9]/g, ''); // hapus simbol, spasi, underscore, dll
};
const xlsx_1 = __importDefault(require("xlsx"));
const products_1 = require("../src/models/products");
const logs_1 = __importDefault(require("../src/logs"));
const path_1 = __importDefault(require("path"));
const models_1 = require("../src/models");
const updateProductImagesFromExcel = async (excelPath) => {
    const workbook = xlsx_1.default.readFile(excelPath);
    const sheet = workbook.SheetNames[0];
    const rows = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet]);
    const products = await products_1.ProductModel.findAll({
        where: { deleted: 0 }
    });
    let updatedCount = 0;
    for (const row of rows) {
        if (!row['Nama File Gambar'])
            continue;
        const imageName = row['Nama File Gambar'].trim();
        const normalizedImage = normalizeString(imageName);
        const matchedProduct = products.find((product) => {
            const normalizedProductName = normalizeString(product.productName);
            return normalizedProductName === normalizedImage;
        });
        if (!matchedProduct) {
            logs_1.default.warn(`[IMAGE MATCH] Tidak ditemukan product untuk image: ${imageName}`);
            continue;
        }
        await matchedProduct.update({
            productImages: [imageName]
        });
        updatedCount++;
        logs_1.default.info(`[IMAGE UPDATED] ${matchedProduct.productName} → ${imageName}`);
    }
    logs_1.default.info(`✅ Total product image terupdate: ${updatedCount}`);
};
exports.updateProductImagesFromExcel = updateProductImagesFromExcel;
const run = async () => {
    try {
        logs_1.default.info('🚀 Starting product image update...');
        await models_1.sequelize.authenticate();
        await (0, exports.updateProductImagesFromExcel)(path_1.default.resolve(__dirname, './product.xlsx'));
        logs_1.default.info('✅ Done updating product images');
        process.exit(0);
    }
    catch (error) {
        logs_1.default.error('❌ Error running script:', error);
        process.exit(1);
    }
};
run();
