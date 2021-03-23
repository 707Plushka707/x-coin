"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFundingFee = void 0;
const node_binance_api_1 = __importDefault(require("node-binance-api"));
function getFundingFee() {
    return __awaiter(this, void 0, void 0, function* () {
        const binance = new node_binance_api_1.default().options({
            APIKEY: 'MeVpTwmK9Naqi0OGsJrVfpPpuyj9QQvW50WU0u1WKUtiIq1TemVIZVlEvaJf8rVM',
            APISECRET: 'u0pKGDdKdcFEZWPztMD2wTe6oc3hHMBD9iwjNnTSl5djYLscxGIbdDy2EL7KSOUr',
        });
        const r = yield binance.promiseRequest('/v1/income', { symbol: 'BTCUSD_PERP', incomeType: 'FUNDING_FEE' }, { base: 'https://dapi.binance.com/dapi/', type: 'SIGNED' });
        console.log(r);
    });
}
exports.getFundingFee = getFundingFee;
