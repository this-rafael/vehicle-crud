import { ISaveEntity } from 'src/domain/common/interfaces/ISaveEntity';
import { Vehicle } from '../entities/Vehicle.entity';
import { IFindByIdEntity } from '../../common/interfaces/IFindByIdEntity';
import { IFindAllEntity } from '../../common/interfaces/IFindAllEntity';

export abstract class VehicleRepository
  implements
    ISaveEntity<Vehicle>,
    IFindByIdEntity<Vehicle>,
    IFindAllEntity<Vehicle>
{
  abstract findById(id: string): Promise<Vehicle>;
  abstract findAll(): Promise<Vehicle[]>;
  abstract save(entity: Vehicle): Promise<Vehicle>;
}
