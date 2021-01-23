import { BaseCommand } from "@shared/core/Command";
import { Level } from "@shared/core/class"

export class LevelCheckController extends BaseCommand {
  command = 'turma';

  async execute() {
  	/*
	   * Hardcoded ID for inferior's role
  	*/
    const guild = this.client.guilds.cache.get('800846475542003712');
    let member = guild.members.cache.get(this.message.author.id);
    if (!member)
    {
      member = await guild.members.fetch(this.message.author.id);
    }
  	const level = member.roles.cache.get("800848964139483136") ? Level.itinha : Level.senpai;

  	return this.message.channel.send(`Você está no ${level}º ano!`); 
  }
}