"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMidleWare = void 0;
const morgan_1 = __importDefault(require("morgan"));
const logs_1 = __importDefault(require("../logs"));
const loggerMidleWare = () => (0, morgan_1.default)('combined', {
    stream: {
        write: (message) => logs_1.default.info(message.trim())
    }
});
exports.loggerMidleWare = loggerMidleWare;
