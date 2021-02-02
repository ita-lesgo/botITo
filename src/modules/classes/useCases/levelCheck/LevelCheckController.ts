import { container } from 'tsyringe';

import { BaseCommand } from '@shared/core/Command';

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
      return this.handleError(err);
    }
  }
}
