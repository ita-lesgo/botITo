import { getRepository, Repository } from 'typeorm';

import { ICreateDayDTO } from '@modules/schedule/dtos/ICreateDayDTO';
import { IDaysRepository } from '@modules/schedule/repositories/IDaysRepository';

import { Day, DayOfTheWeek } from '../entities/Day';

export class DaysRepository implements IDaysRepository {
  private orm: Repository<Day>;

  constructor() {
    this.orm = getRepository(Day);
  }

  public async create(data: ICreateDayDTO): Promise<Day> {
    const createdDay = this.orm.create(data);

    await this.orm.save(createdDay);

    return createdDay;
  }

  public async find(id: string): Promise<Day> {
    return this.orm.findOne({
      where: {
        id,
      },
    });
  }

  public async findByDayClass(
    day: DayOfTheWeek,
    class_id: string
  ): Promise<Day> {
    return this.orm.findOne({
      where: {
        week_day: day,
        class_id,
      },
    });
  }
}
