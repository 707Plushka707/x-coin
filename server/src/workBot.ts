import { time } from 'node:console';
import { FundingFee } from './entity/FundingFee';
import { getManager } from 'typeorm';
import schedule from 'node-schedule';
import BFunding from './utils/binance';
import { sendText } from './utils/pushBear';

const CNY_RATE = 6.45;

interface SquareConfig {
  user: string;
  apiKey: string;
  apiSecret: string;
  symbols: Array<string>;
  capital: number;
  bf?: BFunding;
}

export const sources: { [propName: string]: SquareConfig } = {
  pengtao: {
    user: 'pengtao',
    capital: 110000,
    apiKey: 'MeVpTwmK9Naqi0OGsJrVfpPpuyj9QQvW50WU0u1WKUtiIq1TemVIZVlEvaJf8rVM',
    apiSecret:
      'u0pKGDdKdcFEZWPztMD2wTe6oc3hHMBD9iwjNnTSl5djYLscxGIbdDy2EL7KSOUr',
    symbols: ['BTCUSD_PERP'],
  },
  yangcheng: {
    user: 'yangcheng',
    capital: 600000,
    apiKey: 'u7jogSqzQeIFuJhtcv52LzybqTdOHtJBDpbdHW686Kpf2jk3iufxcSujlwsO9Hli',
    apiSecret:
      'g9TC0BbUIINg3DsevHz5C8tUcxRzd5Vv1ZVmBwdAlGDbFyLSlLZQhJM8UheHkW2Z',

    symbols: ['BTCUSD_PERP', 'BNBUSD_PERP'],
  },
  baiwenping: {
    user: 'baiwenping',
    capital: 20000,
    apiKey: 'a6X2YhbZxJ2Ty5nWkCdbIw9jWgM0u3Iky9PKxztE60c836vdc1iG0lknEBVtX1LY',
    apiSecret:
      'ChAHHu8FZIEsxmNdORRU9I15f9PTbQhh8yp5WRC69eyeIoPkQZozW1gXJ4cya4au',

    symbols: ['DOTUSD_PERP', 'BNBUSD_PERP', 'BTCUSD_PERP'],
  },
  xupeng: {
    user: 'xupeng',
    capital: 1076176,
    apiKey: 'uFOKNzQq2hXvJzsczJ6sCArtCMvdURcpvTVh5oFQYCqUp4o5hJxD8eFuloPW9vtV',
    apiSecret:
      'QqLbHGeJMezxeAypFDzmr7BQsWgcVMhBuI7LxyXnF4ExQYQAGK4MOWJfI6Hd0Xl4',

    symbols: ['BNBUSD_PERP'],
  },
};

export default class WorkBot {
  sources;
  constructor() {
    this.sources = sources;
  }
  start() {
    Object.keys(this.sources).forEach((key) => {
      const element: SquareConfig = this.sources[key];
      const bf = new BFunding(element.apiKey, element.apiSecret);
      element.bf = bf;
    });
    this.startTimerTask();
  }

  async startTimerTask() {
    // await this.queryFundingFee();
    // await this.queryFundingFeeResult();
    const job = schedule.scheduleJob('0 1 0,8,16 * * ?', async () => {
      await this.queryFundingFee();
      await this.queryFundingFeeResult();
    });
  }

  async queryFundingFee() {
    console.log('start->queryFundingFee');
    for (const key in this.sources) {
      const element = this.sources[key];
      console.log('element.symbols', element.symbols);
      const bf = element.bf;
      const promises = element.symbols.map(async (tag) => {
        console.log('tag--', tag);
        const lastItem = await getManager()
          .getRepository(FundingFee)
          .createQueryBuilder('fee')
          .where('fee.user = :user', { user: key })
          .andWhere('fee.symbol = :symbol', { symbol: tag })
          .orderBy('time', 'DESC')
          .getOne();
        console.log('------', key, tag, lastItem);
        return (
          bf &&
          bf.getFundingFeeFirst(tag, lastItem ? Number(lastItem!.time) + 1 : 0)
        );
      });
      const r = await Promise.all(promises);
      const result = await Promise.all(
        r.map(async (items) => {
          const fees = items?.map((orginFee) => {
            let fee = new FundingFee();
            fee.user = key;
            fee.income = orginFee && orginFee.income;
            fee.symbol = orginFee && orginFee.symbol;
            fee.tranId = String(orginFee!.tranId);
            fee.time = orginFee && orginFee.time;
            fee.price = orginFee && orginFee.price;
            fee.cny = String(
              CNY_RATE * Number(orginFee!.price) * Number(orginFee!.income)
            );
            return fee;
          });
          return getManager().save(fees);
        })
      );
    }
  }

  async queryFundingFeeResult() {
    console.log('start->queryFundingFeeResult');
    for (const key in this.sources) {
      const element = this.sources[key];
      const bf = element.bf;
      const promises = element.symbols.map(async (tag) => {
        const lastItem = getManager()
          .getRepository(FundingFee)
          .createQueryBuilder('fee')
          .where('fee.user = :user', { user: key })
          .andWhere('fee.symbol = :symbol', { symbol: tag })
          .orderBy('time', 'DESC')
          .getOne();
        return lastItem;
      });

      const toadySum = await this.queryToadySum(key);

      await Promise.all(promises).then(async (res) => {
        const result = res.filter((item): item is FundingFee => {
          return new Date().getTime() - Number(item?.time) < 28700000; //???????????????????????????
        });
        const desc =
          key +
          '\n' +
          `${result.length && (await this.fundingFeeToString(result))}
          ` +
          `\n??????????????????${toadySum.toFixed(2)}`;
        sendText('????????????', desc, [key]);
      });
    }
  }

  async queryToadySum(user: string) {
    const fees = await getManager()
      .getRepository(FundingFee)
      .createQueryBuilder('fee')
      .where('fee.user = :user', { user: user })
      .andWhere('fee.time >= :time', {
        time: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
      })
      .getMany();
    const sum =
      fees.length > 0
        ? fees.map((f) => Number(f.cny)).reduce((p, c) => p + c)
        : 0;
    return sum;
  }

  fundingFeeToString(fees: Array<FundingFee>) {
    const results = fees.map((fee) => {
      return (
        fee &&
        this.dedent(
          `
          ${fee.symbol.replace('USD_PERP', '')}
          ?????????: ${fee.income}
          ?????????: ${fee.price}
          ??????: ${Number(fee.cny).toFixed(2)}
          `
        )
      );
    });
    const sum = fees
      .map((fee) => fee.cny)
      .reduce((pre, current) => (Number(pre) + Number(current)).toFixed(2));

    return results.join('\n') + `\n\n?????????:${Number(sum).toFixed(2)}`;
  }

  dedent(callSite: string, ...args: Array<string>) {
    function format(str: string) {
      let size = -1;

      return str.replace(/\n(\s+)/g, (m, m1) => {
        if (size < 0) size = m1.replace(/\t/g, '    ').length;

        return '\n' + m1.slice(Math.min(m1.length, size));
      });
    }

    if (typeof callSite === 'string') return format(callSite);
  }
}
