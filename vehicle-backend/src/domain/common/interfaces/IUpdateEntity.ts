import { IEntity } from './IEntity';

export interface IUpdateEntity<T extends IEntity> {
  update(id: string, entity: Partial<T>): Promise<T>;
}
