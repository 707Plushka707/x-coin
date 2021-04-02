import * as EarningController from './controllers/earning';
import express from 'express';
import cors from 'cors';

const app = express();

var router = express.Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('port', 23100);

app.use('/api', router);

router.use('/earning/create', EarningController.createEarning);
router.use('/earning/query', EarningController.queryEarning);
router.use('/earning/users', EarningController.queryAllUser);
router.use('/earning/sum/:user', EarningController.querySum);
router.use('/earning/daySum/:user', EarningController.querySumGroupDay);

export default app;
