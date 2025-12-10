"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_1 = require("../../controllers/health");
const HealthRoute = (0, express_1.Router)();
HealthRoute.get('/', health_1.mainController);
HealthRoute.get('/health', health_1.healthCheckController);
exports.default = HealthRoute;
