import { ICreateDayDTO } from '../dtos/ICreateDayDTO';
import { Day, DayOfTheWeek } from '../infra/typeorm/entities/Day';

export interface IDaysRepository {
  find(id: string): Promise<Day>;
  findByDayClass(day: DayOfTheWeek, class_id: string): Promise<Day>;
  create(data: ICreateDayDTO): Promise<Day>;
}
