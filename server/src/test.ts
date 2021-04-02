import { FundingFee } from './entity/FundingFee';
import { getManager } from 'typeorm';
import BFunding from './utils/binance';

let sources = {
  pengtao: {
    user: 'pengtao',
    apiKey: 'MeVpTwmK9Naqi0OGsJrVfpPpuyj9QQvW50WU0u1WKUtiIq1TemVIZVlEvaJf8rVM',
    apiSecret:
      'u0pKGDdKdcFEZWPztMD2wTe6oc3hHMBD9iwjNnTSl5djYLscxGIbdDy2EL7KSOUr',
    symbols: ['BTCUSD_PERP'],
  },
  yangcheng: {
    user: 'yangcheng',
    apiKey: 'u7jogSqzQeIFuJhtcv52LzybqTdOHtJBDpbdHW686Kpf2jk3iufxcSujlwsO9Hli',
    apiSecret:
      'g9TC0BbUIINg3DsevHz5C8tUcxRzd5Vv1ZVmBwdAlGDbFyLSlLZQhJM8UheHkW2Z',

    symbols: ['BTCUSD_PERP', 'BNBUSD_PERP'],
  },
  baiwenping: {
    user: 'baiwenping',
    apiKey: 'a6X2YhbZxJ2Ty5nWkCdbIw9jWgM0u3Iky9PKxztE60c836vdc1iG0lknEBVtX1LY',
    apiSecret:
      'ChAHHu8FZIEsxmNdORRU9I15f9PTbQhh8yp5WRC69eyeIoPkQZozW1gXJ4cya4au',

    symbols: ['DOTUSD_PERP', 'BNBUSD_PERP', 'BTCUSD_PERP'],
  },
};

const element = sources['baiwenping'];
const bf = new BFunding(element.apiKey, element.apiSecret);

export async function start() {
  // bf.getFundingFeeFirst('BTCUSD_PERP', 0)
  //   .then((r) => {
  //     console.log(r);
  //   })
  //   .catch((err) => console.log(err));
  const fundingFeeRepo = getManager().getRepository(FundingFee);

  // const groupDay = await fundingFeeRepo
  //   .createQueryBuilder('fee')
  //   .select(
  //     "FROM_UNIXTIME( time/1000, '%Y年%m月%d日' ) as date, ROUND(sum(cny),2)  as value"
  //   )
  //   .where('user = :user', { user: 'yangcheng' })
  //   .groupBy('date')
  //   .getRawMany();

  const user = 'pengtao';
  const dayCount = await fundingFeeRepo.query(
    `select count(1) as dayNums from (SELECT FROM_UNIXTIME( time/1000, '%Y年%m月%d' ) as days from funding_fee  where user = '${user}' group by days) a`
  );

  console.log(dayCount[0].dayNums);
}
