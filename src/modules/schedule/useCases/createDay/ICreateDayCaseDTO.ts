import { DayOfTheWeek } from '@modules/schedule/infra/typeorm/entities/Day';

export interface ICreateDayCaseDto {
  week_day: DayOfTheWeek;
  roles: string[];
}
