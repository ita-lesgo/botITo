import { inject, injectable } from 'tsyringe';

import { UseCaseError } from '@shared/domain/errors/UseCaseError';
import { IUseCase } from '@shared/domain/IUseCase';

import { IClassesRepository } from '@modules/classes/repositories/IClassesRepository';
import { Day } from '@modules/schedule/infra/typeorm/entities/Day';
import { IDaysRepository } from '@modules/schedule/repositories/IDaysRepository';

import { ICreateDayCaseDto } from './ICreateDayCaseDTO';

@injectable()
export class CreateDayUseCase implements IUseCase<ICreateDayCaseDto, Day> {
  constructor(
    @inject('DaysRepository') private daysRepositories: IDaysRepository,
    @inject('ClassesRepository') private classesRepository: IClassesRepository
  ) {}

  public async execute({ roles, week_day }: ICreateDayCaseDto): Promise<Day> {
    const getClass = await this.classesRepository.findByRoles(roles);

    if (!getClass) {
      throw new UseCaseError('Você não pertence a uma turma');
    }

    const doesDayExist = await this.daysRepositories.findByDayClass(
      week_day,
      getClass.id
    );

    if (doesDayExist) {
      throw new UseCaseError('Esse dia já está cadastrado');
    }

    const createdDay = await this.daysRepositories.create({
      class_id: getClass.id,
      week_day,
    });

    return createdDay;
  }
}
