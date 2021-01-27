import { getRepository, Repository, In } from 'typeorm';

import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';
import { IClassesRepository } from '@modules/classes/repositories/IClassesRepository';

import { Class } from '../entities/Class';

export class ClassesRepository implements IClassesRepository {
  private orm: Repository<Class>;

  constructor() {
    this.orm = getRepository(Class);
  }

  public async create(data: ICreateClassDTO): Promise<Class> {
    const createdClass = this.orm.create(data);

    await this.orm.save(createdClass);

    return createdClass;
  }

  public async find(id: string): Promise<Class> {
    return this.orm.findOne(id);
  }

  public async findByRole(roleId: string): Promise<Class> {
    return this.orm.findOne({
      where: {
        roleId,
      },
    });
  }

  public async findByRoles(roles: string[]): Promise<Class> {
    return this.orm.findOne({
      where: {
        roleId: In(roles),
      },
    });
  }
}
