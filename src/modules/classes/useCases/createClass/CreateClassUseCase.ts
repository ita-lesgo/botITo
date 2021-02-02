import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@shared/domain/IUseCase';
import { UseCaseError } from '@shared/logic/UseCaseError';

import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';
import { Class } from '@modules/classes/infra/typeorm/entities/Class';
import { IClassesRepository } from '@modules/classes/repositories/IClassesRepository';

@injectable()
export class CreateClassUseCase implements IUseCase<ICreateClassDTO, Class> {
  constructor(
    @inject('ClassesRepository') private classesRepository: IClassesRepository
  ) {}

  public async execute({ level, roleId }: ICreateClassDTO): Promise<Class> {
    const doesClassExist = await this.classesRepository.findByRole(roleId);

    if (doesClassExist) {
      throw new UseCaseError(
        'Essa turma já existe',
        `A turma com o role ${roleId} já existe`
      );
    }

    const newClass = await this.classesRepository.create({ level, roleId });

    return newClass;
  }
}
