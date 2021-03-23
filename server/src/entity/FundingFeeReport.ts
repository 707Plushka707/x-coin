import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('funding_fee_report')
export class FundingFeeReport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  symbol!: string;

  @Column()
  income!: string;

  @Column()
  date!: string;

  @Column()
  cny!: string;

  @Column()
  user!: string;
}
