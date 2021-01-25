import { UseCaseError } from '@shared/logic/UseCaseError';

import { FakeClassRepository } from '@modules/classes/repositories/fakes/FakeClassesRepository';
import { IClassesRepository } from '@modules/classes/repositories/IClassesRepository';

import { LevelCheckUseCase } from './LevelCheckUseCase';

let classesRepository: IClassesRepository;
let levelCheckUseCase: LevelCheckUseCase;

describe('Level check use case', () => {
  beforeEach(() => {
    classesRepository = new FakeClassRepository();
    levelCheckUseCase = new LevelCheckUseCase(classesRepository);
  });

  it('Should be able to check an users level', async (done) => {
    await classesRepository.create({
      level: 1,
      roleId: 'RoleID',
    });

    const data = await levelCheckUseCase.execute(['OtherRole', 'RoleID']);

    expect(data).toBe(1);

    done();
  });

  it('Should throw an error if user does not have any registered roles', async () => {
    await expect(
      levelCheckUseCase.execute(['OtherRole'])
    ).rejects.toBeInstanceOf(UseCaseError);
  });
});
