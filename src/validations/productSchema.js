"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductSchema = joi_1.default.object({
    productName: joi_1.default.string().min(3).max(150).required().messages({
        'string.base': 'Nama produk harus berupa teks',
        'string.empty': 'Nama produk tidak boleh kosong',
        'string.min': 'Nama produk minimal 3 karakter',
        'string.max': 'Nama produk maksimal 150 karakter',
        'any.required': 'Nama produk wajib diisi'
    }),
    productDescription: joi_1.default.string().min(10).max(1000).required().messages({
        'string.base': 'Deskripsi produk harus berupa teks',
        'string.empty': 'Deskripsi produk tidak boleh kosong',
        'string.min': 'Deskripsi produk minimal 10 karakter',
        'string.max': 'Deskripsi produk maksimal 1000 karakter',
        'any.required': 'Deskripsi produk wajib diisi'
    }),
    productImages: joi_1.default.alternatives()
        .try(joi_1.default.array().items(joi_1.default.string().uri()).min(1), joi_1.default.string().uri())
        .optional(),
    productPrice: joi_1.default.number().integer().min(0).required().messages({
        'number.base': 'Harga produk harus berupa angka',
        'number.integer': 'Harga produk harus bilangan bulat',
        'number.min': 'Harga produk tidak boleh kurang dari 0',
        'any.required': 'Harga produk wajib diisi'
    }),
    productCategoryId: joi_1.default.string().min(1).max(50).required().messages({
        'string.base': 'Kategori produk harus berupa teks',
        'string.empty': 'Kategori produk tidak boleh kosong',
        'any.required': 'Kategori produk wajib diisi'
    }),
    productSubCategoryId: joi_1.default.string().min(1).max(50).required().messages({
        'string.base': 'Sub kategori produk harus berupa teks',
        'string.empty': 'Sub kategori produk tidak boleh kosong',
        'any.required': 'Sub kategori produk wajib diisi'
    }),
    productCode: joi_1.default.string().min(1).max(50).required().messages({
        'string.base': 'Kode produk harus berupa teks',
        'string.empty': 'Kode produk tidak boleh kosong',
        'any.required': 'Kode produk wajib diisi'
    }),
    productTotalSale: joi_1.default.number().integer().min(0).default(0).messages({
        'number.base': 'Total penjualan harus berupa angka',
        'number.integer': 'Total penjualan harus bilangan bulat',
        'number.min': 'Total penjualan tidak boleh kurang dari 0'
    }),
    productStock: joi_1.default.number().integer().min(0).required().messages({
        'number.base': 'Stok produk harus berupa angka',
        'number.integer': 'Stok produk harus bilangan bulat',
        'number.min': 'Stok produk tidak boleh kurang dari 0',
        'any.required': 'Stok produk wajib diisi'
    }),
    productDiscount: joi_1.default.number().min(0).max(100).default(0).messages({
        'number.base': 'Diskon produk harus berupa angka',
        'number.min': 'Diskon produk tidak boleh kurang dari 0',
        'number.max': 'Diskon produk tidak boleh lebih dari 100'
    }),
    productWeight: joi_1.default.number().precision(2).min(0).required().messages({
        'number.base': 'Berat produk harus berupa angka',
        'number.min': 'Berat produk tidak boleh kurang dari 0',
        'any.required': 'Berat produk wajib diisi'
    })
});
exports.updateProductSchema = joi_1.default.object({
    productId: joi_1.default.number().integer().positive().required(),
    productName: joi_1.default.string().trim().min(3).max(255).optional(),
    productDescription: joi_1.default.string().trim().min(5).optional(),
    productImages: joi_1.default.alternatives()
        .try(joi_1.default.array().items(joi_1.default.string().uri()).min(1), joi_1.default.string().uri())
        .optional(),
    productPrice: joi_1.default.number().positive().optional(),
    productDiscount: joi_1.default.number().min(0).max(100).optional(),
    productCategoryId: joi_1.default.string().trim().optional(),
    productSubCategoryId: joi_1.default.string().trim().optional(),
    productTotalSale: joi_1.default.number().integer().min(0).optional(),
    productCode: joi_1.default.string().trim().optional(),
    productStock: joi_1.default.number().integer().min(0).optional(),
    productWeight: joi_1.default.number().positive().optional()
}).options({
    abortEarly: false,
    allowUnknown: false
});
