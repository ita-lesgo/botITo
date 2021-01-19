import { MessageEmbed } from 'discord.js';
import { IDiscordArgs } from "../domain/IDiscordArgs";

interface IEmbedArgs {
  title: string;
  description?: string;
  isError?: boolean;
}

export abstract class BaseCommand {
  public abstract command: string;

  protected args: IDiscordArgs;

  protected abstract execute(): any | Promise<any>;

  public async exec(args: IDiscordArgs) {
    this.args = args;

    await this.execute();
  }

  protected embedResponse({title, isError, description}: IEmbedArgs) {
    const embed = new MessageEmbed()
      .setColor(isError ? '#b00020' : '#dddddd')
      .setTitle(title)
    description && embed.setDescription(description);

    return embed;
  }

  protected badArguments(description?: string) {
    return this.args.message.channel.send(this.embedResponse({
      title: 'Argumentos mal-formatados',
      description,
      isError: true,
    }));
  }

  protected unauthorized(description?: string) {
    return this.args.message.channel.send(this.embedResponse({
      title: 'Sem autorização',
      description,
      isError: true,
    }))
  }
}
