import { queryAllUser, querySum } from './controllers/earning';
import { createConnection } from 'typeorm';
import app from './app';

import { sendText } from './utils/wechatwork';
import BFunding from './utils/binance';
import { SSL_OP_TLS_ROLLBACK_BUG } from 'node:constants';
import WorkBot from './workBot';
import { start } from './test';

createConnection().then(async (connection) => {
  const server = app.listen(app.get('port'), () => {
    console.log(
      '  App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env')
    );
    console.log('  Press CTRL-C to stop\n');
    // start();
    // getFundingFee();
    // sendText('我是一个测试的信息');

    // const bf = new BFunding(
    //   'MeVpTwmK9Naqi0OGsJrVfpPpuyj9QQvW50WU0u1WKUtiIq1TemVIZVlEvaJf8rVM',
    //   'u0pKGDdKdcFEZWPztMD2wTe6oc3hHMBD9iwjNnTSl5djYLscxGIbdDy2EL7KSOUr'
    // );
    // bf.getFundingFeeFirst('BTCUSD_PERP').then((r) => {
    //   console.log(r);
    // });

    // queryAllUser();
    // querySum();
    const wb = new WorkBot();
    wb.start();

    // createFundingFeeReoprts();
  });
});

// export default server;
