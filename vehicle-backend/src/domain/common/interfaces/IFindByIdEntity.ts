import { IEntity } from './IEntity';

export interface IFindByIdEntity<T extends IEntity> {
  findById(id: string): Promise<T>;
}
