import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';

@Entity('funding_fee')
export class FundingFee {
  @PrimaryColumn()
  tranId!: string;

  @Column()
  symbol!: string;

  @Column()
  income!: string;

  @Column({ type: 'bigint' })
  time!: number;

  @Column()
  cny!: string;

  @Column()
  price!: string;

  @Column()
  user!: string;
}
// import { Entity, PrimaryColumn, Column } from 'typeorm';

// @Entity('country')
// export class Country {
//   @PrimaryColumn({ name: 'Code' })
//   code!: string;

//   @Column({ name: 'Name' })
//   name!: string;

//   @Column({ name: 'Continent' })
//   continent!: string;

//   @Column({ name: 'SurfaceArea' })
//   surfaceArea!: string;

//   @Column({ name: 'IndepYear' })
//   indepYear!: string;

//   @Column({ name: 'Population' })
//   population!: string;
// }
