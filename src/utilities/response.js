"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
const configs_1 = require("../configs");
exports.ResponseData = {
    error: (message) => {
        return {
            request_param: '',
            status: 'error',
            error_message: message,
            data: null,
            next: '',
            version: { code: configs_1.appConfigs.app.appVersion }
        };
    },
    default: {
        request_param: '',
        status: 'success',
        error_message: null,
        data: '',
        next: '',
        version: { code: configs_1.appConfigs.app.appVersion }
    }
};
