"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const statistic_1 = require("../../controllers/statistic");
const StatisticRoute = (0, express_1.Router)();
StatisticRoute.get('/total', middlewares_1.MiddleWares.authorization, statistic_1.StatisticController.findTotal);
exports.default = StatisticRoute;
