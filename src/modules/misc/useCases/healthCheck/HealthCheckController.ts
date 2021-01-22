import os from 'os';

import { BaseCommand } from "@shared/core/Command";
import { container } from 'tsyringe';
import { HealthCheckUseCase } from './HealthCheckUseCase';

export class HealthCheckController extends BaseCommand {
  command = 'health';

  async execute() {
    const msg = await this.message.channel.send('Calculando diagnósticos');

    
    const healthCheckUseCase = container.resolve(HealthCheckUseCase);
    
    const { ping, cores, cpu, isSlow, ram } = healthCheckUseCase
    .execute(msg.createdTimestamp - this.message.createdTimestamp);
    
    const embed = this
    .embedResponse({
      title: 'Botito diagnósticos',
      description: 'Os diagnósticos são:'
    })
    .addFields(
      {
        name: 'Ping',
        value: ping,
      },
      {
        name: 'Processos (cores)',
        value: cores,
      },
      {
        name: 'Processador',
        value: cpu,
      },
      {
        name: 'RAM disponível',
        value: `${ram} GB`,
      },
      );

      await this.message.channel.send(embed);

      await msg.delete();

      return isSlow && this.message.channel.send('Parece que o bot está lento.');
  }
}