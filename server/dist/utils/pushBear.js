"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendText = void 0;
const request_1 = __importDefault(require("request"));
const WECHATWORK_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9f918c9f-4326-4eda-8b8c-f5065e393256';
const WECHATBOT_URL = '118.25.84.114:18881/api/v1/chat/sendText?token=99d44e39c3cd49d08188dcc795d06969';
function sendText(title, desc, atList) {
    let content = `${title}\n${desc}`;
    console.log(title + '\n\n' + desc);
    sendTextToWechatWork(title, desc, atList);
}
exports.sendText = sendText;
function sendTextToWechatWork(title, desc, atList) {
    let content = `# ${title}\n\n\n\n${desc}\n${atList === null || atList === void 0 ? void 0 : atList.map((at) => `<@${at}>`).join('')}`;
    request_1.default.post(WECHATWORK_URL, {
        json: {
            msgtype: 'markdown',
            markdown: {
                content,
            },
        },
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(res);
    });
}
function sendTextToWechatBot(content) {
    request_1.default.post(WECHATBOT_URL, {
        json: {
            toUser: '19895927008@chatroom',
            content: 'test \n@Chris_PT',
            atList: ['Chris_PT'],
        },
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(res);
    });
}
