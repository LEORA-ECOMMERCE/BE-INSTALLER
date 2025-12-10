"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidtransSnap = void 0;
const midtrans_client_1 = __importDefault(require("midtrans-client"));
const _1 = require(".");
exports.MidtransSnap = new midtrans_client_1.default.Snap({
    isProduction: _1.appConfigs.midtrans.isProduction,
    serverKey: _1.appConfigs.midtrans.serverKey,
    clientKey: _1.appConfigs.midtrans.clientKey
});
