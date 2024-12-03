import { IEntity } from '../interfaces/IEntity';

export type Pagination<T extends IEntity> = {
  take: number;
  skip: number;
  total: number;
  order: {
    [P in keyof T]?: 'asc' | 'desc';
  };
  items: T[];
};
