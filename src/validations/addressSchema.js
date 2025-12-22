"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createAddressSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    addressUserName: joi_1.default.string().min(3).max(100).required().messages({
        'string.base': 'Nama penerima harus berupa teks',
        'string.empty': 'Nama penerima tidak boleh kosong',
        'string.min': 'Nama penerima minimal 3 karakter',
        'string.max': 'Nama penerima maksimal 100 karakter',
        'any.required': 'Nama penerima wajib diisi'
    }),
    addressKontak: joi_1.default.string()
        .pattern(/^[0-9+]+$/)
        .min(10)
        .max(15)
        .required()
        .messages({
        'string.base': 'Nomor kontak harus berupa teks',
        'string.empty': 'Nomor kontak tidak boleh kosong',
        'string.pattern.base': 'Nomor kontak hanya boleh berisi angka atau tanda +',
        'string.min': 'Nomor kontak minimal 10 digit',
        'string.max': 'Nomor kontak maksimal 15 digit',
        'any.required': 'Nomor kontak wajib diisi'
    }),
    addressDetail: joi_1.default.string().min(5).max(255).required().messages({
        'string.base': 'Detail alamat harus berupa teks',
        'string.empty': 'Detail alamat tidak boleh kosong',
        'string.min': 'Detail alamat minimal 5 karakter',
        'string.max': 'Detail alamat maksimal 255 karakter',
        'any.required': 'Detail alamat wajib diisi'
    }),
    addressPostalCode: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
        'string.base': 'Kode pos harus berupa teks',
        'string.empty': 'Kode pos tidak boleh kosong',
        'string.pattern.base': 'Kode pos hanya boleh berisi angka',
        'any.required': 'Kode pos wajib diisi'
    }),
    addressProvinsi: joi_1.default.string().min(3).max(100).required().messages({
        'string.base': 'Provinsi harus berupa teks',
        'string.empty': 'Provinsi tidak boleh kosong',
        'string.min': 'Provinsi minimal 3 karakter',
        'string.max': 'Provinsi maksimal 100 karakter',
        'any.required': 'Provinsi wajib diisi'
    }),
    addressKabupaten: joi_1.default.string().min(3).max(100).required().messages({
        'string.base': 'Kabupaten harus berupa teks',
        'string.empty': 'Kabupaten tidak boleh kosong',
        'string.min': 'Kabupaten minimal 3 karakter',
        'string.max': 'Kabupaten maksimal 100 karakter',
        'any.required': 'Kabupaten wajib diisi'
    }),
    addressKecamatan: joi_1.default.string().min(3).max(100).required().messages({
        'string.base': 'Kecamatan harus berupa teks',
        'string.empty': 'Kecamatan tidak boleh kosong',
        'string.min': 'Kecamatan minimal 3 karakter',
        'string.max': 'Kecamatan maksimal 100 karakter',
        'any.required': 'Kecamatan wajib diisi'
    }),
    addressDesa: joi_1.default.string().min(3).max(100).required().messages({
        'string.base': 'Desa harus berupa teks',
        'string.empty': 'Desa tidak boleh kosong',
        'string.min': 'Desa minimal 3 karakter',
        'string.max': 'Desa maksimal 100 karakter',
        'any.required': 'Desa wajib diisi'
    }),
    addressLongitude: joi_1.default.string()
        .pattern(/^-?\d+(\.\d+)?$/)
        .required()
        .messages({
        'string.base': 'Longitude harus berupa teks',
        'string.empty': 'Longitude tidak boleh kosong',
        'string.pattern.base': 'Format longitude tidak valid',
        'any.required': 'Longitude wajib diisi'
    }),
    addressLatitude: joi_1.default.string()
        .pattern(/^-?\d+(\.\d+)?$/)
        .required()
        .messages({
        'string.base': 'Latitude harus berupa teks',
        'string.empty': 'Latitude tidak boleh kosong',
        'string.pattern.base': 'Format latitude tidak valid',
        'any.required': 'Latitude wajib diisi'
    })
});
