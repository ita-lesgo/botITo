import { DayOfTheWeek } from '../infra/typeorm/entities/Day';

export interface ICreateDayDTO {
  class_id: string;
  week_day: DayOfTheWeek;
}
