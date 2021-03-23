"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFundingFeeReoprts = exports.getFundingFee = void 0;
const FundingFee_1 = require("./../entity/FundingFee");
const typeorm_1 = require("typeorm");
const node_binance_api_1 = __importDefault(require("node-binance-api"));
const dayjs_1 = __importDefault(require("dayjs"));
class BFunding {
    constructor(apiKey, apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.binance = new node_binance_api_1.default().options({
            APIKEY: this.apiKey,
            APISECRET: this.apiSecret,
        });
    }
    getFundingFeeFirst(tag, startTime) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const r = yield this.binance.promiseRequest('/v1/income', {
                    symbol: tag,
                    incomeType: 'FUNDING_FEE',
                    limit: 1000,
                    startTime,
                }, { base: 'https://dapi.binance.com/dapi/', type: 'SIGNED' });
                const p = yield this.binance.deliveryPrices({ symbol: tag });
                const coinPrice = p[tag];
                console.log('getFundingFeeFirst', tag, coinPrice, JSON.stringify(r));
                return r.map((item) => {
                    return {
                        income: item.income,
                        symbol: item.symbol,
                        time: item.time,
                        tranId: item.tranId,
                        price: coinPrice,
                    };
                });
            }
            catch (error) {
                console.log('error', error);
                throw error;
            }
        });
    }
}
exports.default = BFunding;
function getFundingFee() {
    return __awaiter(this, void 0, void 0, function* () {
        const binance = new node_binance_api_1.default().options({
            APIKEY: 'MeVpTwmK9Naqi0OGsJrVfpPpuyj9QQvW50WU0u1WKUtiIq1TemVIZVlEvaJf8rVM',
            APISECRET: 'u0pKGDdKdcFEZWPztMD2wTe6oc3hHMBD9iwjNnTSl5djYLscxGIbdDy2EL7KSOUr',
        });
        const r = yield binance.promiseRequest('/v1/income', { symbol: 'BTCUSD_PERP', incomeType: 'FUNDING_FEE' }, { base: 'https://dapi.binance.com/dapi/', type: 'SIGNED' });
        const fees = r.map((item) => {
            let fee = new FundingFee_1.FundingFee();
            fee.user = 'pengtao';
            fee.income = item.income;
            fee.symbol = item.symbol;
            fee.tranId = String(item.tranId);
            fee.time = item.time * 0.001;
            fee.cny = '101';
            console.log(String(item.tranId));
            return fee;
        });
        // console.log(fees);
        typeorm_1.getManager()
            .save(fees)
            .then((r) => console.log('---'));
    });
}
exports.getFundingFee = getFundingFee;
function isSameDay(timeStampA, timeStampB) {
    let dateA = new Date(timeStampA * 1000);
    let dateB = new Date(timeStampB * 1000);
    console.log('data', dateA, dateB, timeStampA);
    return dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0);
}
function createFundingFeeReoprts() {
    return __awaiter(this, void 0, void 0, function* () {
        const fundingFeeRepo = typeorm_1.getManager().getRepository(FundingFee_1.FundingFee);
        const fees = yield fundingFeeRepo
            .createQueryBuilder('fee')
            .orderBy('time')
            .getMany();
        let result = [];
        let object;
        fees.forEach((item) => {
            if (!object || !isSameDay(object.time, item.time)) {
                object && result.push(object);
                object = Object.assign({}, item);
            }
            else {
                object.income = String(Number(object.income) + Number(item.income));
            }
        });
        const reports = result.map((item) => {
            return Object.assign(Object.assign({}, item), { date: dayjs_1.default.unix(item.time).format('YYYY-MM-DD'), cny: (Number(item.income) * 56000 * 6.4).toFixed(2) });
        });
        console.log(reports);
    });
}
exports.createFundingFeeReoprts = createFundingFeeReoprts;
