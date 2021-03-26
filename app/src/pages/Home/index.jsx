import { Card, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import request from '../../utils/request';
import styles from './index.module.less';

const { TabPane } = Tabs;

function Home() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});

  useEffect(async () => {
    let users = await request.get('/api/earning/users');
    setUsers(users);
  }, []);

  useEffect(async () => {
    console.log('----', users);
    handleTabClick(users.length && users[0].user);
  }, [users]);

  const handleTabClick = async (key) => {
    if (!data[key]) {
      let result = await request.get(`/api/earning/sum/${key}`);
      setData({
        ...data,
        [key]: result,
      });
    }
    console.log('handleTabClick', key);
  };

  return (
    <div className={styles.page}>
      <header>💰💰💰💰💰💰</header>
      <div className={styles.body}>
        <Tabs onChange={handleTabClick}>
          {users.map((user) => {
            return (
              <TabPane tab={user.user} key={user.user}>
                <Card>
                  <div style={{ display: 'flex' }}>
                    <div className={styles.total}>
                      <div className={styles.totalTitle}>总收益(CNY)</div>
                      <div className={styles.totalValue}>{data[user.user] && data[user.user].total.toFixed(2)}</div>
                    </div>
                    <div className={styles.total}>
                      <div className={styles.totalTitle}>今天收益(CNY)</div>
                      <div className={styles.totalValue}>
                        {(data[user.user] && data[user.user].today && data[user.user].today.toFixed(2)) || 0}
                      </div>
                    </div>
                  </div>
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
