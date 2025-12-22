"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleWares = void 0;
const appRole_1 = require("./appRole");
const authorization_1 = require("./authorization");
const cors_1 = require("./cors");
const limiter_1 = require("./limiter");
const morgan_1 = require("./morgan");
const upload_file_1 = require("./upload-file");
exports.MiddleWares = {
    authorization: authorization_1.authorization,
    corsOrigin: cors_1.corsOrigin,
    limiter: limiter_1.limiter,
    loggerMidleWare: morgan_1.loggerMidleWare,
    uploadMidleWare: upload_file_1.uploadMidleWare,
    allowAppRoles: appRole_1.allowAppRoles
};
