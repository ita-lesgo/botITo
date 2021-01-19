import { Discord } from "@shared/domain/DiscordClient";

const client = new Discord();

client.on('ready', () => {
  console.log('Bot ready')
});

client.on('message', async (message) => {
  if (!message.content.startsWith(client.prefix) || message.author.bot) return;

  const args = message.content.slice(client.prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  await client.commands.get(command).exec({
    message,
    args,
    client,
  });
  
});

client.login(client.discordToken);