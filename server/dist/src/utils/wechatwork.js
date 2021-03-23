"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendText = void 0;
const request_promise_1 = __importDefault(require("request-promise"));
let access_token = null;
let access_token_time = 0;
function getAccessToken() {
    return new Promise((resolve, reject) => {
        if (access_token && new Date().getTime() - access_token_time < 7000) {
            console.log('----');
            resolve(access_token);
        }
        else {
            request_promise_1.default
                .get('https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww84fee05dc1a1e86e&corpsecret=NwviBQoPtmjRvtSHXwHFewDBfN6q6gjUFEDp8owRH0M')
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
function sendText(content) {
    getAccessToken().then((token) => {
        console.log(access_token);
        request_promise_1.default
            .post(`https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${token}`, {
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
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    });
}
exports.sendText = sendText;
