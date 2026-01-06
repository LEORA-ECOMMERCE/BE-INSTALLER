"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductSchema = joi_1.default.object({
  productName: joi_1.default.string().min(3).max(150).required().messages({
    "string.base": "Nama produk harus berupa teks",
    "string.empty": "Nama produk tidak boleh kosong",
    "string.min": "Nama produk minimal 3 karakter",
    "string.max": "Nama produk maksimal 150 karakter",
    "any.required": "Nama produk wajib diisi",
  }),
  productDescription: joi_1.default
    .string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      "string.base": "Deskripsi produk harus berupa teks",
      "string.empty": "Deskripsi produk tidak boleh kosong",
      "string.min": "Deskripsi produk minimal 10 karakter",
      "string.max": "Deskripsi produk maksimal 1000 karakter",
      "any.required": "Deskripsi produk wajib diisi",
    }),
  productImages: joi_1.default
    .alternatives()
    .try(
      joi_1.default.array().items(joi_1.default.string()).min(1),
      joi_1.default.string()
    )
    .optional(),
  productPrice: joi_1.default.number().integer().min(0).required().messages({
    "number.base": "Harga produk harus berupa angka",
    "number.integer": "Harga produk harus bilangan bulat",
    "number.min": "Harga produk tidak boleh kurang dari 0",
    "any.required": "Harga produk wajib diisi",
  }),
  productCategoryId: joi_1.default
    .number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      "number.base": "category parent harus berupa angka",
      "number.integer": "category parent harus bilangan bulat",
      "number.min": "category parent tidak boleh kurang dari 0",
    }),
  productSubCategoryId: joi_1.default
    .number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      "number.base": "sub category harus berupa angka",
      "number.integer": "sub category harus bilangan bulat",
      "number.min": "sub category tidak boleh kurang dari 0",
    }),
  productCode: joi_1.default.string().min(1).max(50).required().messages({
    "string.base": "Kode produk harus berupa teks",
    "string.empty": "Kode produk tidak boleh kosong",
    "any.required": "Kode produk wajib diisi",
  }),
  productTotalSale: joi_1.default
    .number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      "number.base": "Total penjualan harus berupa angka",
      "number.integer": "Total penjualan harus bilangan bulat",
      "number.min": "Total penjualan tidak boleh kurang dari 0",
    }),
  productStock: joi_1.default.number().integer().min(0).required().messages({
    "number.base": "Stok produk harus berupa angka",
    "number.integer": "Stok produk harus bilangan bulat",
    "number.min": "Stok produk tidak boleh kurang dari 0",
    "any.required": "Stok produk wajib diisi",
  }),
  productDiscount: joi_1.default
    .number()
    .min(0)
    .max(100)
    .optional()
    .default(0)
    .messages({
      "number.base": "Diskon produk harus berupa angka",
      "number.min": "Diskon produk tidak boleh kurang dari 0",
      "number.max": "Diskon produk tidak boleh lebih dari 100",
    }),
  productWeight: joi_1.default
    .number()
    .precision(2)
    .min(0)
    .required()
    .messages({
      "number.base": "Berat produk harus berupa angka",
      "number.min": "Berat produk tidak boleh kurang dari 0",
      "any.required": "Berat produk wajib diisi",
    }),
  productBarcode: joi_1.default.string().optional(),
  productUnit: joi_1.default.string().optional(),
  productIsVisible: joi_1.default.boolean().optional(),
});
exports.updateProductSchema = joi_1.default
  .object({
    productId: joi_1.default.number().integer().positive().required(),
    productName: joi_1.default.string().trim().min(3).max(255).optional(),
    productDescription: joi_1.default.string().optional().allow(""),
    productImages: joi_1.default
      .alternatives()
      .try(
        joi_1.default.array().items(joi_1.default.string()),
        joi_1.default.string()
      )
      .optional()
      .default([]),
    productPrice: joi_1.default.number().positive().optional(),
    productDiscount: joi_1.default.number().min(0).max(100).optional(),
    productCategoryId: joi_1.default.number().optional(),
    productSubCategoryId: joi_1.default.number().optional(),
    productTotalSale: joi_1.default.number().integer().min(0).optional(),
    productCode: joi_1.default.string().trim().optional(),
    productStock: joi_1.default.number().integer().min(0).optional(),
    productWeight: joi_1.default.number().positive().optional(),
    productBarcode: joi_1.default.string().optional(),
    productUnit: joi_1.default.string().optional(),
    productIsVisible: joi_1.default.boolean().optional(),
  })
  .options({
    abortEarly: false,
    allowUnknown: false,
  });
