import { container } from 'tsyringe';

import { BaseCommand } from '@shared/core/Command';

import { discordConfig } from '@config/discord';
import { DayOfTheWeek } from '@modules/schedule/infra/typeorm/entities/Day';

import { CreateDayUseCase } from './CreateDayUseCase';
import { createDayValidator } from './CreateDayValidator';

export class CreateDayController extends BaseCommand {
  public command = 'day:create';

  public async execute(): Promise<any> {
    const [givenWeekDay] = this.args;
    const roles = this.message.member.roles.cache.map(
      (cachedRole) => cachedRole.id
    );

    const weekDay = Number(givenWeekDay);

    if (
      !this.validate(
        createDayValidator,
        { weekDay },
        `O comando correto é ${discordConfig.prefix}day:create [Dia em número (1-6)]`
      )
    ) {
      return;
    }

    const createDayUseCase = container.resolve(CreateDayUseCase);

    try {
      const { week_day: day } = await createDayUseCase.execute({
        roles,
        week_day: Number(weekDay) as DayOfTheWeek,
      });

      return this.message.channel.send(
        this.embedResponse({
          title: `Dia ${day} criado com sucesso`,
        })
      );
    } catch (err) {
      return this.handleError(err);
    }
  }
}
