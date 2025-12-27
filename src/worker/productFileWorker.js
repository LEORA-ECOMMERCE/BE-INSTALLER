"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const products_1 = require("../models/products");
const fileUpload_1 = require("../models/fileUpload");
const configs_1 = require("../configs");
const logs_1 = __importDefault(require("../logs"));
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
new bullmq_1.Worker(
  "product-file-queue",
  async (job) => {
    const { fileId, filePath } = job.data;
    logs_1.default.info(
      `[FileWorker]-Processing file upload job for file ID: ${fileId}`
    );
    await fileUpload_1.FileUploadModel.update(
      { status: "PROCESSING" },
      { where: { fileId: fileId } }
    );
    try {
      // Simulasi proses file besar (misalnya 10 detik)
      console.log(`[WORKER] Simulating heavy processing...`);
      await sleep(10000 * 2); // 10 detik
      const workbook = xlsx_1.default.readFile(filePath);
      const sheet = workbook.SheetNames[0];
      const data = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet]);
      // Simulasi proses baris demi baris (misalnya setiap row 1 detik)
      for (let i = 0; i < data.length; i++) {
        console.log(`[WORKER] Processing row ${i + 1}/${data.length}`);
        await sleep(1000);
      }
      const products = data.map((item) => ({
        productName: item.nama,
        productDescription: item.deskripsi,
        productImages: [item.image],
        productPrice: Number(item.harga) || 0,
        productCategoryId: item.kategori,
        productSubCategoryId: item.subkategori,
        productCode: item.kode || "",
        productStock: Number(item.stok) || 0,
        productDiscount: Number(item.diskon) || 0,
        productWeight: Number(item.berat) || 0,
      }));
      await products_1.ProductModel.bulkCreate(products);
      await fileUpload_1.FileUploadModel.update(
        { status: "SUCCESS" },
        {
          where: { fileId: fileId },
        }
      );
      fs_1.default.unlinkSync(filePath);
    } catch (err) {
      logs_1.default.error(
        `[FileWorker]-Error processing file ID ${fileId}:`,
        err
      );
      await fileUpload_1.FileUploadModel.update(
        { status: "FAILED", message: err.message },
        { where: { fileId: fileId } }
      );
    }
  },
  {
    connection: {
      host: configs_1.appConfigs.redis.host,
      port: configs_1.appConfigs.redis.port,
    },
  }
);
