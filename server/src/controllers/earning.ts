import { FundingFee } from './../entity/FundingFee';
import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { time } from 'node:console';

export const createEarning = async (req: Request, res: Response) => {
  const fundingFeeRepo = getManager().getRepository(FundingFee);

  const newFundingFee = fundingFeeRepo.create({
    symbol: 'BTC',
    income: '0.0124',
    user: 'pengtao',
    time: 1570608000000,
    cny: '130',
  });

  await fundingFeeRepo.save(newFundingFee);

  res.json({ hello: 'world1' });
};

export const queryEarning = async (req: Request, res: Response) => {
  const fundingFeeRepo = getManager().getRepository(FundingFee);
  const fees = await fundingFeeRepo
    .createQueryBuilder('fee')
    .orderBy('time')
    .getMany();
  const results = fees.map((item) => {
    return {
      ...item,
      income: Number(item.income),
    };
  });

  res.json(results);
};

export const queryAllUser = async (req: Request, res: Response) => {
  const fundingFeeRepo = getManager().getRepository(FundingFee);
  const users = await fundingFeeRepo
    .createQueryBuilder()
    .distinct()
    .select('DISTINCT user')
    .getRawMany();

  res.json(users);
};

export const querySum = async (req: Request, res: Response) => {
  const user = req.params.user;
  const fundingFeeRepo = getManager().getRepository(FundingFee);
  const total: { total: number } = await fundingFeeRepo
    .createQueryBuilder('fee')
    .select('SUM(cny) total')
    .where('user = :user', { user })
    .getRawOne();

  // SELECT * FROM funding_fee WHERE date_format(FROM_UNIXTIME(time/1000),'%Y-%m-%d') = date_format(now(),'%Y-%m-%d')
  const today: { today: number } = await fundingFeeRepo
    .createQueryBuilder('fee')
    .select('SUM(cny) today')
    .where('user = :user', { user })
    .andWhere(
      "date_format(FROM_UNIXTIME(time/1000),'%Y-%m-%d') = date_format(now(),'%Y-%m-%d')"
    )
    .getRawOne();
  res.json({ total: total.total, today: today.today });
};
