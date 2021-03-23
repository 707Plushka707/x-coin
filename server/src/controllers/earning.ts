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
