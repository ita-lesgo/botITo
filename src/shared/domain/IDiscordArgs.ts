import { Message, Client } from 'discord.js';

export interface IDiscordArgs {
  message: Message;
  client: Client;
  args: string[];
}
