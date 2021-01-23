export interface IDiscordConfig {
  token: string;
  prefix: string;
}

export const discordConfig: IDiscordConfig = {
  token: process.env.DISCORD_TOKEN,
  prefix: process.env.DEV_PREFIX ? process.env.DEV_PREFIX : '/',
}