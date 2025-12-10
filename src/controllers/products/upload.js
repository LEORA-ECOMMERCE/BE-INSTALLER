"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductExcel = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileUpload_1 = require("../../models/fileUpload");
const productFileQueue_1 = require("../../queues/productFileQueue");
const requestHandler_1 = require("../../utilities/requestHandler");
// === 1️⃣ Tentukan folder upload di root project ===
const uploadDir = path_1.default.resolve(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// === 2️⃣ Konfigurasi storage Multer ===
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
// === 3️⃣ Filter hanya untuk file Excel ===
const excelFileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel' // .xls
    ];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only Excel files (.xls, .xlsx) are allowed!'));
    }
    cb(null, true);
};
// === 4️⃣ Buat instance multer ===
const upload = (0, multer_1.default)({
    storage,
    fileFilter: excelFileFilter
}).single('file');
// === 5️⃣ Controller upload Excel ===
const uploadProductExcel = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message || 'Invalid file upload'
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded. Please upload an Excel file (.xls / .xlsx)'
            });
        }
        try {
            const payload = {
                fileName: req.file.originalname,
                filePath: req.file.path,
                status: 'PENDING'
            };
            // Simpan ke tabel file_upload
            const fileRecord = await fileUpload_1.FileUploadModel.create(payload);
            // Tambahkan ke queue BullMQ
            await (0, productFileQueue_1.addProductFileToQueue)(fileRecord.fileId, req.file.path);
            return res.status(202).json({
                success: true,
                message: 'File uploaded successfully, processing started in background',
                data: {
                    fileId: fileRecord.fileId,
                    fileName: fileRecord.fileName,
                    status: fileRecord.status
                }
            });
        }
        catch (serverError) {
            if (req.file && fs_1.default.existsSync(req.file.path)) {
                fs_1.default.unlink(req.file.path, () => { });
            }
            return (0, requestHandler_1.handleServerError)(res, serverError);
        }
    });
};
exports.uploadProductExcel = uploadProductExcel;
