"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_1 = require("../../controllers/webhook");
const WebhookRouter = (0, express_1.Router)();
WebhookRouter.post('/midtrans', webhook_1.WebhookController.midtransWebhookHandler);
WebhookRouter.post('/bitships', webhook_1.WebhookController.bitshipWebhookHandler);
exports.default = WebhookRouter;
