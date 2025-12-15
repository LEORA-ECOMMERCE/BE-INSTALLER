"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionService = void 0;
const axios_1 = __importDefault(require("axios"));
const REGION_BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api';
class RegionService {
    static async getProvinces() {
        const response = await axios_1.default.get(`${REGION_BASE_URL}/provinces.json`);
        return response.data;
    }
    static async getRegencies(provinceId) {
        const response = await axios_1.default.get(`${REGION_BASE_URL}/regencies/${provinceId}.json`);
        return response.data;
    }
    static async getDistricts(regencyId) {
        const response = await axios_1.default.get(`${REGION_BASE_URL}/districts/${regencyId}.json`);
        return response.data;
    }
    static async getVillages(districtId) {
        const response = await axios_1.default.get(`${REGION_BASE_URL}/villages/${districtId}.json`);
        return response.data;
    }
}
exports.RegionService = RegionService;
