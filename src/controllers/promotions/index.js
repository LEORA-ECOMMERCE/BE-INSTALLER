"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionController = void 0;
const findAllPromotions_1 = require("./findAllPromotions");
const removePromotion_1 = require("./removePromotion");
const updatePromotion_1 = require("./updatePromotion");
exports.PromotionController = {
    findAllPromotion: findAllPromotions_1.findAllPromotion,
    updatePromotion: updatePromotion_1.updatePromotion,
    removePromotion: removePromotion_1.removePromotion
};
