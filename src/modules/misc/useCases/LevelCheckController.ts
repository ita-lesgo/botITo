import { BaseCommand } from "@shared/core/Command";

enum Level
{
	itinha = 1,
	senpai
};

export class LevelCheckController extends BaseCommand {
  command = 'turma';

  execute() {
  	/*
	   * Hardcoded ID for inferior's role
  	*/
    const guild = this.args.client.guilds.cache.get('800846475542003712');
    const member = guild.members.cache.get(this.args.message.author.id)
  	const level:Level = member.roles.cache.has("800848964139483136") ? Level.itinha : Level.senpai;

  	return this.args.message.channel.send(`Você está no ${level}º ano!`); 
  }
}