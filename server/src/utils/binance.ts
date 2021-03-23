import { FundingFee } from './../entity/FundingFee';
import { getManager } from 'typeorm';
import Binance from 'node-binance-api';
import dayjs from 'dayjs';
interface FundingFeeResult {
  income: string;
  time: number;
  symbol: string;
  tranId: string;
}
class BFunding {
  apiKey: string;
  apiSecret: string;
  binance: any;
  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.binance = new Binance().options({
      APIKEY: this.apiKey,
      APISECRET: this.apiSecret,
    });
  }

  public async getFundingFeeFirst(tag: string, startTime: number) {
    try {
      const r: Array<FundingFeeResult> = await this.binance.promiseRequest(
        '/v1/income',
        {
          symbol: tag,
          incomeType: 'FUNDING_FEE',
          limit: 1000,
          startTime,
        },
        { base: 'https://dapi.binance.com/dapi/', type: 'SIGNED' }
      );
      const p = await this.binance.deliveryPrices({ symbol: tag });
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
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}

export default BFunding;
export async function getFundingFee() {
  const binance = new Binance().options({
    APIKEY: 'MeVpTwmK9Naqi0OGsJrVfpPpuyj9QQvW50WU0u1WKUtiIq1TemVIZVlEvaJf8rVM',
    APISECRET:
      'u0pKGDdKdcFEZWPztMD2wTe6oc3hHMBD9iwjNnTSl5djYLscxGIbdDy2EL7KSOUr',
  });

  const r: Array<any> = await binance.promiseRequest(
    '/v1/income',
    { symbol: 'BTCUSD_PERP', incomeType: 'FUNDING_FEE' },
    { base: 'https://dapi.binance.com/dapi/', type: 'SIGNED' }
  );

  const fees = r.map((item) => {
    let fee = new FundingFee();
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
  getManager()
    .save(fees)
    .then((r) => console.log('---'));
}

function isSameDay(timeStampA: number, timeStampB: number) {
  let dateA = new Date(timeStampA * 1000);
  let dateB = new Date(timeStampB * 1000);
  console.log('data', dateA, dateB, timeStampA);
  return dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0);
}

export async function createFundingFeeReoprts() {
  const fundingFeeRepo = getManager().getRepository(FundingFee);
  const fees = await fundingFeeRepo
    .createQueryBuilder('fee')
    .orderBy('time')
    .getMany();

  let result: Array<FundingFee> = [];
  let object: FundingFee;
  fees.forEach((item) => {
    if (!object || !isSameDay(object.time, item.time)) {
      object && result.push(object);
      object = {
        ...item,
      };
    } else {
      object.income = String(Number(object.income) + Number(item.income));
    }
  });

  const reports = result.map((item) => {
    return {
      ...item,
      date: dayjs.unix(item.time).format('YYYY-MM-DD'),
      cny: (Number(item.income) * 56000 * 6.4).toFixed(2),
    };
  });

  console.log(reports);
}
