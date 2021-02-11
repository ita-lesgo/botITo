import { v4 as uuid } from 'uuid';

import { ICreateDayDTO } from '@modules/schedule/dtos/ICreateDayDTO';
import {
  Day,
  DayOfTheWeek,
} from '@modules/schedule/infra/typeorm/entities/Day';

import { IDaysRepository } from '../IDaysRepository';

export class FakeDaysRepository implements IDaysRepository {
  private days: Day[] = [];

  public async create(data: ICreateDayDTO): Promise<Day> {
    const createdDay = new Day();
    Object.assign(createdDay, { id: uuid(), ...data });

    this.days.push(createdDay);

    return createdDay;
  }

  public async find(id: string): Promise<Day> {
    return this.days.find((day) => day.id === id);
  }

  public async findByDayClass(
    day: DayOfTheWeek,
    class_id: string
  ): Promise<Day> {
    return this.days.find(
      (storedDay) =>
        storedDay.week_day === day && storedDay.class_id === class_id
    );
  }
}
