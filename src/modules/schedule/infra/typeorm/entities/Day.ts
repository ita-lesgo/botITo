import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Class } from '@modules/classes/infra/typeorm/entities/Class';

export type DayOfTheWeek = 1 | 2 | 3 | 4 | 5;

@Entity()
export class Day {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public class_id: string;

  @ManyToOne(() => Class, (_class) => _class.schedule)
  @JoinColumn({ name: 'class_id' })
  public class: Class;

  @Column()
  public week_day: DayOfTheWeek;
}
