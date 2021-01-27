import { container } from 'tsyringe';

import { BaseCommand } from '@shared/core/Command';
import { UseCaseError } from '@shared/logic/UseCaseError';

import { LevelCheckUseCase } from './LevelCheckUseCase';

export class LevelCheckController extends BaseCommand {
  public command = 'turma';

  public async execute(): Promise<any> {
    try {
      const roles = this.message.member.roles.cache.map(
        (cachedRole) => cachedRole.id
      );

      const levelCheckUseCase = container.resolve(LevelCheckUseCase);
      const data = await levelCheckUseCase.execute(roles);

      console.log(data);

      return this.message.channel.send(
        this.embedResponse({
          title: `Você é do ${data}º ano`,
        })
      );
    } catch (err) {
      if (err instanceof UseCaseError) {
        return this.message.channel.send(
          this.embedResponse({
            isError: true,
            title: err.message,
            description: err.description,
          })
        );
      }

      console.error(err);

      return this.message.channel.send(
        this.embedResponse({
          isError: true,
          title: 'Algo deu errado',
        })
      );
    }
  }
}
