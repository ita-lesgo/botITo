import { UseCaseError } from '@shared/domain/errors/UseCaseError';

import { FakeClassRepository } from '@modules/classes/repositories/fakes/FakeClassesRepository';
import { IClassesRepository } from '@modules/classes/repositories/IClassesRepository';
import { FakeDaysRepository } from '@modules/schedule/repositories/fakes/FakeDaysRepository';
import { IDaysRepository } from '@modules/schedule/repositories/IDaysRepository';

import { CreateDayUseCase } from './CreateDayUseCase';

let daysRepository: IDaysRepository;
let classesRepository: IClassesRepository;
let createDayUseCase: CreateDayUseCase;

describe('Create day', () => {
  beforeEach(() => {
    daysRepository = new FakeDaysRepository();
    classesRepository = new FakeClassRepository();
    createDayUseCase = new CreateDayUseCase(daysRepository, classesRepository);
  });

  it('Should be able to create day', async (done) => {
    const { roleId } = await classesRepository.create({
      level: 1,
      roleId: 'role_id',
    });

    const { week_day: weekDay } = await createDayUseCase.execute({
      roles: [roleId],
      week_day: 1,
    });

    expect(weekDay).toBe(1);

    done();
  });

  it('Should throw an error if day alreay exists', async (done) => {
    const { roleId, id } = await classesRepository.create({
      level: 1,
      roleId: 'role_id',
    });

    await daysRepository.create({
      class_id: id,
      week_day: 1,
    });

    await expect(
      createDayUseCase.execute({
        roles: [roleId],
        week_day: 1,
      })
    ).rejects.toBeInstanceOf(UseCaseError);

    done();
  });

  it('Should throw an error if the class does not exist', async (done) => {
    await expect(
      createDayUseCase.execute({
        roles: ['doesnt exist'],
        week_day: 1,
      })
    ).rejects.toBeInstanceOf(UseCaseError);

    done();
  });
});
