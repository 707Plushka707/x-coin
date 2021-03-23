import request from 'request-promise';

let access_token: string | null = null;
let access_token_time: number = 0;

function getAccessToken(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (access_token && new Date().getTime() - access_token_time < 7000) {
      console.log('----');
      resolve(access_token);
    } else {
      request
        .get(
          'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww84fee05dc1a1e86e&corpsecret=NwviBQoPtmjRvtSHXwHFewDBfN6q6gjUFEDp8owRH0M'
        )
        .then((res) => {
          const r = JSON.parse(res);
          console.log(r.access_token);
          access_token = r.access_token;
          access_token_time = new Date().getTime();
          resolve(access_token);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }
  });
}

export function sendText(content: string) {
  getAccessToken().then((token) => {
    console.log(access_token);
    request
      .post(
        `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${token}`,
        {
          json: {
            touser: 'pengtao',
            msgtype: 'text',
            agentid: 1000008,
            text: {
              content,
            },
            safe: 0,
            enable_id_trans: 0,
            enable_duplicate_check: 0,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
}
