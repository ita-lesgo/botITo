import { container } from 'tsyringe';

import { ClassesRepository } from '@modules/classes/infra/typeorm/repositories/ClassesRepository';
import { IClassesRepository } from '@modules/classes/repositories/IClassesRepository';

container.registerSingleton<IClassesRepository>(
  'ClassesRepository',
  ClassesRepository
);
