"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const configs_1 = require("../configs");
function hashPassword(password) {
    return require('crypto')
        .createHash('sha1')
        .update(password + configs_1.appConfigs.secret.passwordEncryption)
        .digest('hex');
}
exports.hashPassword = hashPassword;
