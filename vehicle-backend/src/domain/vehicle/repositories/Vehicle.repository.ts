import { ISaveEntity } from 'src/domain/common/interfaces/ISaveEntity';
import { Vehicle } from '../entities/Vehicle.entity';
import { IFindByIdEntity } from '../../common/interfaces/IFindByIdEntity';
import { IFindAllEntity } from '../../common/interfaces/IFindAllEntity';
import { IDeleteEntity } from '../../common/interfaces/IDeleteEntity';
import { IUpdateEntity } from '../../common/interfaces/IUpdateEntity';
import { ISearchEntity } from '../../common/interfaces/ISearchEntity';
import { SearchCriteria } from '../../common/types/SearchCriteria';
import { Pagination } from '../../common/types/Pagination';

export abstract class VehicleRepository
  implements
    ISaveEntity<Vehicle>,
    IFindByIdEntity<Vehicle>,
    IFindAllEntity<Vehicle>,
    IDeleteEntity,
    IUpdateEntity<Vehicle>,
    ISearchEntity<Vehicle>
{
  abstract findById(id: string): Promise<Vehicle>;
  abstract findAll(): Promise<Vehicle[]>;
  abstract save(entity: Vehicle): Promise<Vehicle>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, entity: Vehicle): Promise<Vehicle>;
  abstract search(
    query: SearchCriteria<Vehicle>,
    selection: Array<keyof Vehicle>,
  ): Promise<Pagination<Vehicle>>;
}
