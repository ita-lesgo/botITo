import { Client, Collection, ClientOptions } from 'discord.js';

import { discordConfig } from '@config/discord';

import { BaseCommand } from '../core/Command';
import { commands } from '../core/commands';

export class Discord extends Client {
  public readonly discordToken: string;

  public readonly prefix: string;

  public commands: Collection<string, BaseCommand>;

  constructor(options?: ClientOptions) {
    super(options);

    this.commands = new Collection();

    this.discordToken = discordConfig.token;

    this.prefix = discordConfig.prefix;

    this.loadCmds();
  }

  public loadCmds(): void {
    commands.forEach((Cmd) => {
      const Command = new Cmd();

      this.commands.set(Command.command, Command);
    });
  }
}
