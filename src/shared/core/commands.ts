import { CreateClassController } from '@modules/classes/useCases/createClass/CreateClassController';
import { LevelCheckController } from '@modules/classes/useCases/levelCheck/LevelCheckController';
import { HealthCheckController } from '@modules/misc/useCases/healthCheck/HealthCheckController';
import { CreateDayController } from '@modules/schedule/useCases/createDay/CreateDayController';

import { BaseCommand } from './Command';

export const commands: Array<{ new (): BaseCommand }> = [
  HealthCheckController,
  LevelCheckController,
  CreateClassController,
  CreateDayController,
];
