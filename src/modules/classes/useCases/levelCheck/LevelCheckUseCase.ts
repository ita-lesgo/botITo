import { injectable, inject } from 'tsyringe';

import { UseCaseError } from '@shared/domain/errors/UseCaseError';
import { IUseCase } from '@shared/domain/IUseCase';

import { IClassesRepository } from '@modules/classes/repositories/IClassesRepository';

@injectable()
export class LevelCheckUseCase implements IUseCase<string[], number> {
  constructor(
    @inject('ClassesRepository') private classesRepository: IClassesRepository
  ) {}

  public async execute(roles: string[]): Promise<number> {
    const foundClass = await this.classesRepository.findByRoles(roles);

    if (!foundClass) {
      throw new UseCaseError('Você atualmente não está em uma sala registrada');
    }

    return foundClass.level;
  }
}
