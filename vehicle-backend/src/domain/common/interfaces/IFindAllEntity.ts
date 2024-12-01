import { IEntity } from './IEntity';

export interface IFindAllEntity<T extends IEntity> {
  findAll(): Promise<T[]>;
}
