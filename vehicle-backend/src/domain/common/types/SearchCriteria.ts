import { IEntity } from '../interfaces/IEntity';
import { GenericWhere } from './GenericWhere';

export type SearchCriteria<T extends IEntity> = {
  take?: number;
  skip?: number;
  order: Partial<{
    [P in keyof T]?: 'asc' | 'desc';
  }>;
  where: GenericWhere<T>;
};
