import { ICreateClassDTO } from '../dtos/ICreateClassDTO';
import { Class } from '../infra/typeorm/entities/Class';

export interface IClassesRepository {
  find(id: string): Promise<Class>;
  findByRole(role: string): Promise<Class>;
  findByRoles(role: string[]): Promise<Class>;
  create(data: ICreateClassDTO): Promise<Class>;
}
