import { IEntity } from './IEntity';
import { SearchCriteria } from '../types/SearchCriteria';
import { Pagination } from '../types/Pagination';

export interface ISearchEntity<T extends IEntity> {
  search(
    criteria: SearchCriteria<T>,
    selection: Array<keyof T>,
  ): Promise<Pagination<T>>;
}
