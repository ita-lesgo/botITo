import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Class } from '@modules/classes/infra/typeorm/entities/Class';

import { Teacher } from './Teacher';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public schedule: string;

  @Column()
  public teacher_id: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.schedule)
  @JoinColumn({ name: 'teacher_id' })
  public teacher: Class;
}
