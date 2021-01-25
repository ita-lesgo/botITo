import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Lesson } from './Lesson';

export type Gender = 'male' | 'female';
@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public gender: string;

  @OneToMany(() => Lesson, (lesson) => lesson.teacher, {
    cascade: true,
  })
  public schedule: Lesson;
}
