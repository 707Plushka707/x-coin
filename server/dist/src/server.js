"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const workBot_1 = __importDefault(require("./workBot"));
typeorm_1.createConnection().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const server = app_1.default.listen(app_1.default.get('port'), () => {
        console.log('  App is running at http://localhost:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
        console.log('  Press CTRL-C to stop\n');
        // getFundingFee();
        // sendText('我是一个测试的信息');
        // const bf = new BFunding(
        //   'MeVpTwmK9Naqi0OGsJrVfpPpuyj9QQvW50WU0u1WKUtiIq1TemVIZVlEvaJf8rVM',
        //   'u0pKGDdKdcFEZWPztMD2wTe6oc3hHMBD9iwjNnTSl5djYLscxGIbdDy2EL7KSOUr'
        // );
        // bf.getFundingFeeFirst('BTCUSD_PERP').then((r) => {
        //   console.log(r);
        // });
        const wb = new workBot_1.default();
        wb.start();
        // createFundingFeeReoprts();
    });
}));
// export default server;
