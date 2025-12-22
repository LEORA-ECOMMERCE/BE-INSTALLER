"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSellPrice = void 0;
function calculateSellPrice({ originalPrice, discountPercent }) {
    if (!originalPrice || originalPrice <= 0)
        return 0;
    if (!discountPercent || discountPercent <= 0)
        return originalPrice;
    if (discountPercent >= 100)
        return 0;
    return Math.round(originalPrice - (originalPrice * discountPercent) / 100);
}
exports.calculateSellPrice = calculateSellPrice;
