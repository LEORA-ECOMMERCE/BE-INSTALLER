"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const v1_1 = __importDefault(require("./routes/v1"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(middlewares_1.MiddleWares.corsOrigin());
// app.use(MiddleWares.limiter())
app.use(middlewares_1.MiddleWares.loggerMidleWare());
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use(v1_1.default);
exports.default = app;
