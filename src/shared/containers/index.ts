import { container } from 'tsyringe';

import { ClassesRepository } from '@modules/classes/infra/typeorm/repositories/ClassesRepository';
import { IClassesRepository } from '@modules/classes/repositories/IClassesRepository';
import { DaysRepository } from '@modules/schedule/infra/typeorm/repositories/DaysRepository';

container.registerSingleton<IClassesRepository>(
  'ClassesRepository',
  ClassesRepository
);

container.registerSingleton('DaysRepository', DaysRepository);
