"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllOrderPublicSchema =
  exports.updateProductPublicSchema =
  exports.createProductPublicSchema =
    void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductPublicSchema = joi_1.default.object({
  code: joi_1.default.string().min(1).max(50).required().messages({
    "string.base": "Kode produk harus berupa teks",
    "string.empty": "Kode produk tidak boleh kosong",
    "any.required": "Kode produk wajib diisi",
    "string.min": "Barcode produk minimal 1 karakter",
    "string.max": "Barcode produk maksimal 50 karakter",
  }),
  barcode: joi_1.default.string().min(1).max(50).required().messages({
    "string.base": "Barcode produk harus berupa teks",
    "string.empty": "Barcode produk tidak boleh kosong",
    "any.required": "Barcode produk wajib diisi",
    "string.min": "Barcode produk minimal 1 karakter",
    "string.max": "Barcode produk maksimal 50 karakter",
  }),
  name: joi_1.default.string().min(3).max(150).required().messages({
    "string.base": "Nama produk harus berupa teks",
    "string.empty": "Nama produk tidak boleh kosong",
    "string.min": "Nama produk minimal 3 karakter",
    "string.max": "Nama produk maksimal 150 karakter",
    "any.required": "Nama produk wajib diisi",
  }),
  stock: joi_1.default.number().integer().min(0).required().messages({
    "number.base": "Stok produk harus berupa angka",
    "number.integer": "Stok produk harus bilangan bulat",
    "number.min": "Stok produk tidak boleh kurang dari 0",
    "any.required": "Stok produk wajib diisi",
  }),
  price: joi_1.default.number().integer().min(0).required().messages({
    "number.base": "Harga produk harus berupa angka",
    "number.integer": "Harga produk harus bilangan bulat",
    "number.min": "Harga produk tidak boleh kurang dari 0",
    "any.required": "Harga produk wajib diisi",
  }),
  weight: joi_1.default.number().precision(2).min(0).required().messages({
    "number.base": "Berat produk harus berupa angka",
    "number.min": "Berat produk tidak boleh kurang dari 0",
    "any.required": "Berat produk wajib diisi",
  }),
  unit: joi_1.default.string().min(1).max(50).required().messages({
    "string.base": "Unit atau satuan produk harus berupa teks",
    "string.empty": "Unit atau satuan produk tidak boleh kosong",
    "any.required": "Unit atau satuan produk wajib diisi",
  }),
  isVisible: joi_1.default.boolean().required(),
});
// code, unit, visibility
exports.updateProductPublicSchema = joi_1.default.object({
  code: joi_1.default.string().min(1).max(50).required().messages({
    "string.base": "Kode produk harus berupa teks",
    "string.empty": "Kode produk tidak boleh kosong",
    "string.min": "Kode produk minimal 1 karakter",
    "string.max": "Kode produk maksimal 50 karakter",
    "any.required": "Kode produk wajib diisi",
  }),
  barcode: joi_1.default.string().min(1).max(50).optional().messages({
    "string.base": "Barcode produk harus berupa teks",
    "string.empty": "Barcode produk tidak boleh kosong",
    "string.min": "Barcode produk minimal 1 karakter",
    "string.max": "Barcode produk maksimal 50 karakter",
  }),
  name: joi_1.default.string().min(3).max(150).optional().messages({
    "string.base": "Nama produk harus berupa teks",
    "string.empty": "Nama produk tidak boleh kosong",
    "string.min": "Nama produk minimal 3 karakter",
    "string.max": "Nama produk maksimal 150 karakter",
  }),
  stock: joi_1.default.number().integer().min(0).optional().messages({
    "number.base": "Stok produk harus berupa angka",
    "number.integer": "Stok produk harus bilangan bulat",
    "number.min": "Stok produk tidak boleh kurang dari 0",
  }),
  price: joi_1.default.number().integer().min(0).optional().messages({
    "number.base": "Harga produk harus berupa angka",
    "number.integer": "Harga produk harus bilangan bulat",
    "number.min": "Harga produk tidak boleh kurang dari 0",
  }),
  weight: joi_1.default.number().precision(2).min(0).optional().messages({
    "number.base": "Berat produk harus berupa angka",
    "number.min": "Berat produk tidak boleh kurang dari 0",
  }),
  unit: joi_1.default.string().min(1).max(50).optional().messages({
    "string.base": "Unit atau satuan produk harus berupa teks",
    "string.empty": "Unit atau satuan produk tidak boleh kosong",
    "string.min": "Unit atau satuan produk minimal 1 karakter",
    "string.max": "Unit atau satuan produk maksimal 50 karakter",
  }),
  isVisible: joi_1.default.boolean().optional().messages({
    "boolean.base": "Status visible harus berupa true atau false",
  }),
});
exports.findAllOrderPublicSchema = joi_1.default
  .object({
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow("").optional(),
    pagination: joi_1.default.boolean().optional(),
    orderStatus: joi_1.default
      .string()
      .valid("waiting", "process", "draft", "delivery", "done", "cancel")
      .optional(),
    startDate: joi_1.default.date().iso().optional(),
    endDate: joi_1.default.date().iso().optional(),
  })
  .with("startDate", "endDate")
  .with("endDate", "startDate");
