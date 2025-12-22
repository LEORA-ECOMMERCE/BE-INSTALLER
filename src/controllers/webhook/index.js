"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const bitship_1 = require("./bitship");
const midtrans_1 = require("./midtrans");
exports.WebhookController = {
    midtransWebhookHandler: midtrans_1.midtransWebhookHandler,
    bitshipWebhookHandler: bitship_1.bitshipWebhookHandler
};
