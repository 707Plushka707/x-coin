import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('country')
export class Country {
  @PrimaryColumn({ name: 'Code' })
  code!: string;

  @Column({ name: 'Name' })
  name!: string;

  @Column({ name: 'Continent' })
  continent!: string;

  @Column({ name: 'SurfaceArea' })
  surfaceArea!: string;

  @Column({ name: 'IndepYear' })
  indepYear!: string;

  @Column({ name: 'Population' })
  population!: string;
}
