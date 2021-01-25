import { v4 as uuid } from 'uuid';

import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';
import { Class } from '@modules/classes/infra/typeorm/entities/Class';

import { IClassesRepository } from '../IClassesRepository';

export class FakeClassRepository implements IClassesRepository {
  private classes: Class[] = [];

  public async find(id: string): Promise<Class> {
    return this.classes.find((clss) => clss.id === id);
  }

  public async create(data: ICreateClassDTO): Promise<Class> {
    const createdClass = new Class();
    Object.assign(createdClass, { id: uuid(), ...data });

    this.classes.push(createdClass);

    return createdClass;
  }

  public async findByRole(role: string): Promise<Class> {
    return this.classes.find((clss) => clss.roleId === role);
  }

  public async findByRoles(roles: string[]): Promise<Class> {
    return this.classes.find((clss) => roles.includes(clss.roleId));
  }
}
