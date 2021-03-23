import * as EarningController from './controllers/earning';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

var router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('port', 3100);

app.use('/api', router);

router.use('/earning/create', EarningController.createEarning);
router.use('/earning/query', EarningController.queryEarning);

export default app;
