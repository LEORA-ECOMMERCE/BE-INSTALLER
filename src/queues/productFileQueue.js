"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductFileToQueue = void 0;
const bullmq_1 = require("bullmq");
const configs_1 = require("../configs");
const logs_1 = __importDefault(require("../logs"));
const productFileQueue = new bullmq_1.Queue('product-file-queue', {
    connection: {
        host: configs_1.appConfigs.redis.host,
        port: configs_1.appConfigs.redis.port
    }
});
async function addProductFileToQueue(fileId, filePath) {
    logs_1.default.info('Adding job to product file queue:', { fileId, filePath });
    await productFileQueue.add('process-product-file', { fileId, filePath }, {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: true,
        removeOnFail: false
    });
}
exports.addProductFileToQueue = addProductFileToQueue;
exports.default = productFileQueue;
