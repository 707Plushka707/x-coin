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
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryEarning = exports.createEarning = void 0;
const FundingFee_1 = require("./../entity/FundingFee");
const typeorm_1 = require("typeorm");
const createEarning = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fundingFeeRepo = typeorm_1.getManager().getRepository(FundingFee_1.FundingFee);
    const newFundingFee = fundingFeeRepo.create({
        symbol: 'BTC',
        income: '0.0124',
        user: 'pengtao',
        time: 1570608000000,
        cny: '130',
    });
    yield fundingFeeRepo.save(newFundingFee);
    res.json({ hello: 'world1' });
});
exports.createEarning = createEarning;
const queryEarning = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fundingFeeRepo = typeorm_1.getManager().getRepository(FundingFee_1.FundingFee);
    const user = yield fundingFeeRepo
        .createQueryBuilder('fee')
        .where('fee.id = :id', { id: 1 })
        .getOne();
    const result = yield typeorm_1.getManager().query(`SELECT FROM_UNIXTIME(time,'%Y-%m-%d')AS DATE,COUNT(*) FROM funding_fee WHERE user='pengtao' GROUP BY FROM_UNIXTIME(time,'%Y-%m-%d');`);
    res.json(JSON.stringify(result));
});
exports.queryEarning = queryEarning;
