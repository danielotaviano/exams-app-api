import { InterfaceRepository } from './interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

export abstract class AbstractRepository<T> implements InterfaceRepository<T> {
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async create(data: T | any): Promise<T> {
    return await this.entity.save(data);
  }

  public async findById(id: string): Promise<T> {
    return await this.entity.findOne(id);
  }

  public async findAll(): Promise<T[]> {
    return await this.entity.find();
  }
  public async update(id: string, entity: T): Promise<UpdateResult> {
    return await this.entity.update(id, entity);
  }

  public async remove(id: string): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }
}
