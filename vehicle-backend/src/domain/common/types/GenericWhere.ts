import { IEntity } from '../interfaces/IEntity';
import { CompareOperator } from './CompareOperator';

export type GenericWhere<T extends IEntity> = {
  [P in keyof T]?: {
    [P in CompareOperator]?: any;
  };
};
