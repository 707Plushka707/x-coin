import { Card, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import request from '../../utils/request';
import styles from './index.module.less';
import { Column } from '@ant-design/charts';
import BigNumber from 'bignumber.js';

const { TabPane } = Tabs;

function Home() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [dataSum, setDataSum] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = async (user) => {
    let result = await request.get(`/api/earning/daySum/${user}`);
    console.log(result);
    setDataSum(result);
  };
  useEffect(async () => {
    let users = await request.get('/api/earning/users');
    setUsers(users);
  }, []);

  useEffect(async () => {
    console.log('----', users);
    handleTabClick(users.length && users[0].user);
  }, [users]);

  const handleTabClick = async (key) => {
    if (users.length > 0 && !data[key]) {
      let result = await request.get(`/api/earning/sum/${key}`);
      setData({
        ...data,
        [key]: result,
      });
    }
    asyncFetch(key);
    console.log('handleTabClick', key);
  };

  const config = {
    xField: 'date',
    yField: 'value',
    meta: {
      date: {
        alias: 'ζΆι΄',
      },
      value: {
        alias: 'ζΆη',
      },
    },
    xAxis: { label: { autoRotate: false } },
    // label: {
    //   // position: 'top',
    //   // autoRotate: false,
    //   // style: {
    //   //   font: '5px',
    //   // },
    // },
    slider: {
      start: 0,
      end: 1,
    },
  };

  return (
    <div className={styles.page}>
      <header>π°π°π°π°π°π°</header>
      <div className={styles.body}>
        <Tabs onChange={handleTabClick}>
          {users.map((user) => {
            return (
              <TabPane tab={user.user} key={user.user}>
                {/* <Card> */}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div className={styles.total}>
                    <div className={styles.totalTitle}>ζ»ζΆη(CNY)</div>
                    <div className={styles.totalValue}>{data[user.user] && data[user.user].total.toFixed(2)}</div>
                  </div>
                  <div className={styles.total}>
                    <div className={styles.totalTitle}>δ»ε€©ζΆη(CNY)</div>
                    <div className={styles.totalValue}>
                      {BigNumber(data[user.user] && data[user.user].today && data[user.user].today).toFixed(2) || 0}
                    </div>
                  </div>
                  <div className={styles.total}>
                    <div className={styles.totalTitle}>ζ₯εζΆη(CNY)</div>
                    <div className={styles.totalValue}>
                      {(data[user.user] && data[user.user].today && data[user.user].dayAvg.toFixed(2)) || 0}
                    </div>
                  </div>
                  <div className={styles.total}>
                    <div className={styles.totalTitle}>ζ₯εε©η</div>
                    <div className={styles.totalValue}>
                      {BigNumber(data[user.user] && data[user.user].today && data[user.user].dayRate * 100).toFixed(
                        4,
                      ) || 0}
                      %
                    </div>
                  </div>
                  <div className={styles.total}>
                    <div className={styles.totalTitle}>εΉ΄ε</div>
                    <div className={styles.totalValue}>
                      {BigNumber(data[user.user] && data[user.user].today && data[user.user].yearRate * 100).toFixed(
                        2,
                      ) || 0}
                      %
                    </div>
                  </div>
                </div>
                {/* </Card> */}
                <Card title="ζ₯ζΆη">
                  <Column {...config} data={dataSum} />
                </Card>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
