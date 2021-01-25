import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Day } from '@modules/schedule/infra/typeorm/entities/Day';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public level: 1 | 2;

  @Column('role_id')
  public roleId: string;

  @OneToMany(() => Day, (day) => day.class, {
    cascade: true,
  })
  public schedule: Day;
}
