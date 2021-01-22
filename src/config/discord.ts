export interface IDiscordConfig {
  token: string;
  prefix: string;
}

export const discordConfig: IDiscordConfig = {
  token: process.env.DISCORD_TOKEN,
  prefix: '&',
}