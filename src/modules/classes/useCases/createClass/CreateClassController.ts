import { container } from 'tsyringe';

import { BaseCommand } from '@shared/core/Command';

import { discordConfig } from '@config/discord';

import { CreateClassUseCase } from './CreateClassUseCase';
import { createClassSchema } from './CreateClassValidator';

export class CreateClassController extends BaseCommand {
  public command = 'turma:create';

  public async execute(): Promise<any> {
    try {
      const createClassUseCase = container.resolve(CreateClassUseCase);

      const [sentRole, level] = this.args;

      if (
        !this.validate(
          createClassSchema,
          { sentRole, level },
          `O comando correto é ${discordConfig.prefix}turma:create [tag do role] [nível (1 ou 2)]`
        )
      ) {
        return;
      }

      const roleId = sentRole.replace(/\D/g, ''); // pega apenas o id

      if (!this.message.member.roles.cache.find((role) => role.id === roleId)) {
        return this.message.channel.send(
          this.embedResponse({
            isError: true,
            title: 'Esse cargo não existe',
          })
        );
      }

      if (!this.message.member.permissions.has('MANAGE_ROLES')) {
        return this.unauthorized(
          'Você precisa da permissão de gerenciar cargos para executar eses comando'
        );
      }

      const createdClass = await createClassUseCase.execute({
        roleId,
        level: Number(level) as 1 | 2,
      });

      return this.message.channel.send(
        this.embedResponse({
          title: 'Nova turma criada',
          description: `Uma nova turma foi criada com o id ${createdClass.id}`,
        })
      );
    } catch (err) {
      return this.handleError(err);
    }
  }
}
