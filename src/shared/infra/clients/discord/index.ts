import { Discord } from '@shared/domain/DiscordClient';

const client = new Discord();

client.on('ready', () => {
  console.log('Bot ready');
});

client.on('message', async (message) => {
  try {
    if (!message.content.startsWith(client.prefix) || message.author.bot) return;

    const args = message.content.slice(client.prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (command)
    {
      await command.exec({
        message,
        args,
        client,
      });
    };
  } catch (e) {
    console.error(e);
  }
});

client.login(client.discordToken);
