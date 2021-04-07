import request from 'request';

const WECHATWORK_URL =
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=7ce160c4-acc5-4295-b43a-dca233ad0b7e';
// const WECHATWORK_URL_TEST =
//   'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=ab52ac95-f265-4860-9f72-74749cafbf3d';

const WECHATBOT_URL =
  '118.25.84.114:18881/api/v1/chat/sendText?token=99d44e39c3cd49d08188dcc795d06969';

export function sendText(title: string, desc: string, atList?: Array<string>) {
  let content = `${title}\n${desc}`;

  console.log(title + '\n\n' + desc);
  sendTextToWechatWork(title, desc, atList);
}

function sendTextToWechatWork(
  title: string,
  desc: string,
  atList?: Array<string>
) {
  let content = `# ${title}\n\n\n\n${desc}\n${atList
    ?.map((at) => `<@${at}>`)
    .join('')}`;
  request.post(
    WECHATWORK_URL,
    {
      json: {
        msgtype: 'markdown',
        markdown: {
          content,
        },
      },
    },
    (err: any, res: any, body: any) => {
      if (err) {
        return console.log(err);
      }
      console.log(body);
    }
  );
}

function sendTextToWechatBot(content: string) {
  request.post(
    WECHATBOT_URL,
    {
      json: {
        toUser: '19895927008@chatroom',
        content: 'test \n@Chris_PT',
        atList: ['Chris_PT'],
      },
    },
    (err: any, res: any, body: any) => {
      if (err) {
        return console.log(err);
      }
      console.log(body);
    }
  );
}
