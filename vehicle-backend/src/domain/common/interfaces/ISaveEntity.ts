import { IEntity } from './IEntity';

export interface ISaveEntity<T extends IEntity> {
  save(entity: T): Promise<T>;
}
