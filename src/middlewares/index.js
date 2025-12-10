"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleWares = void 0;
const authorization_1 = require("./authorization");
const cors_1 = require("./cors");
// import { limiter } from './limiter'
const morgan_1 = require("./morgan");
const upload_file_1 = require("./upload-file");
exports.MiddleWares = {
    authorization: authorization_1.authorization,
    corsOrigin: cors_1.corsOrigin,
    // limiter,
    loggerMidleWare: morgan_1.loggerMidleWare,
    uploadMidleWare: upload_file_1.uploadMidleWare
};
