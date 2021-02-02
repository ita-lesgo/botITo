import { UseCaseError } from '@shared/logic/UseCaseError';

import { FakeClassRepository } from '@modules/classes/repositories/fakes/FakeClassesRepository';
import { IClassesRepository } from '@modules/classes/repositories/IClassesRepository';

import { CreateClassUseCase } from './CreateClassUseCase';

let classesRepository: IClassesRepository;
let createClassUseCase: CreateClassUseCase;

describe('Create class', () => {
  beforeEach(() => {
    classesRepository = new FakeClassRepository();
    createClassUseCase = new CreateClassUseCase(classesRepository);
  });

  it('Should be able to create a new class', async (done) => {
    const { roleId } = await createClassUseCase.execute({
      level: 1,
      roleId: 'role id',
    });

    expect(roleId).toBe('role id');

    done();
  });

  it('Should throw an error if class already exists', async (done) => {
    await classesRepository.create({
      level: 1,
      roleId: 'role id',
    });

    await expect(
      createClassUseCase.execute({ level: 1, roleId: 'role id' })
    ).rejects.toBeInstanceOf(UseCaseError);

    done();
  });
});
