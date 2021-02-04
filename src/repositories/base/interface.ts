import { DeleteResult, UpdateResult } from 'typeorm';

export interface InterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  findAll(): Promise<T[]>;

  findById(id: string): Promise<T>;

  remove(id: string): Promise<DeleteResult>;

  update(id: string, entity: T): Promise<UpdateResult>;
}
