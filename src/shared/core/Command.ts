import { Message, MessageEmbed } from 'discord.js';
import { ObjectSchema } from 'joi';

import { UseCaseError } from '@shared/domain/errors/UseCaseError';

import { IDiscordArgs } from '../domain/IDiscordArgs';

interface IEmbedArgs {
  title: string;
  description?: string;
  isError?: boolean;
}

export abstract class BaseCommand {
  public abstract command: string;

  protected message: IDiscordArgs['message'];

  protected client: IDiscordArgs['client'];

  protected args: IDiscordArgs['args'];

  protected abstract execute(): any | Promise<any>;

  public async exec({ message, args, client }: IDiscordArgs): Promise<void> {
    this.args = args;
    this.message = message;
    this.client = client;

    await this.execute();
  }

  protected embedResponse({
    title,
    isError,
    description,
  }: IEmbedArgs): MessageEmbed {
    const embed = new MessageEmbed()
      .setColor(isError ? '#b00020' : '#dddddd')
      .setThumbnail(this.client.user.avatarURL())
      .setTitle(title);

    if (description) {
      embed.setDescription(description);
    }

    return embed;
  }

  protected badArguments(description?: string): Promise<Message> {
    return this.message.channel.send(
      this.embedResponse({
        title: 'Argumentos mal-formatados',
        description,
        isError: true,
      })
    );
  }

  protected unauthorized(description?: string): Promise<Message> {
    return this.message.channel.send(
      this.embedResponse({
        title: 'Sem autorização',
        description,
        isError: true,
      })
    );
  }

  protected handleError(err: Error): Promise<Message> {
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

  protected validate<Schema, Data>(
    schema: ObjectSchema<Schema>,
    data: Data,
    description?: string
  ): boolean {
    const { error } = schema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      const embed = this.embedResponse({
        title: 'Argumentos mal-formatados',
        description,
        isError: true,
      });

      error.details.forEach((err, index) => {
        embed.addField(`${index + 1}º erro`, err.message);
      });

      this.message.channel.send(embed);
      return false;
    }

    return true;
  }
}
