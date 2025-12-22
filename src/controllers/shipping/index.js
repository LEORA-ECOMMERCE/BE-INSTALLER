"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingController = void 0;
const getShippingRates_1 = require("./getShippingRates");
const createShippingDraft_1 = require("./createShippingDraft");
const confirmDraftOrder_1 = require("./confirmDraftOrder");
const trackShipping_1 = require("./trackShipping");
exports.ShippingController = {
    getShippingRates: getShippingRates_1.getShippingRates,
    createShippingDraft: createShippingDraft_1.createShippingDraft,
    confirmDraftOrder: confirmDraftOrder_1.confirmDraftOrder,
    trackShipment: trackShipping_1.trackShipment
};
