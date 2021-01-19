import { BaseCommand } from "@shared/core/Command";

export class HealthCheckController extends BaseCommand {
  command = 'hello';

  execute() {
    return this.args.message.channel.send(this.embedResponse({
      title: 'Hello world!',
      description: 'Esse é o boITo'
    }));
  }
}