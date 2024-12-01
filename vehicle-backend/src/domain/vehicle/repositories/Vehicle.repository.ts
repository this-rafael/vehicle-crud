import { ISaveEntity } from 'src/domain/common/interfaces/ISaveEntity';
import { Vehicle } from '../entities/Vehicle.entity';
import { IFindByIdEntity } from '../../common/interfaces/IFindByIdEntity';
import { IFindAllEntity } from '../../common/interfaces/IFindAllEntity';
import { IDeleteEntity } from '../../common/interfaces/IDeleteEntity';

export abstract class VehicleRepository
  implements
    ISaveEntity<Vehicle>,
    IFindByIdEntity<Vehicle>,
    IFindAllEntity<Vehicle>,
    IDeleteEntity
{
  abstract findById(id: string): Promise<Vehicle>;
  abstract findAll(): Promise<Vehicle[]>;
  abstract save(entity: Vehicle): Promise<Vehicle>;
  abstract delete(id: string): Promise<void>;
}
