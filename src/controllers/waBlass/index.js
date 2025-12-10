"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaBlasController = void 0;
const history_1 = require("./history");
const remove_1 = require("./remove");
const sendMessage_1 = require("./sendMessage");
exports.WaBlasController = {
    findAllHistory: history_1.waBlasHistoryFindAll,
    findDetailHistory: history_1.waBlasHistoryFindOne,
    removeWablasHistory: remove_1.removeWablasHistory,
    send: sendMessage_1.waBlasSendMessage
};
