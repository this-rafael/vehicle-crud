import { Injectable, Inject } from '@nestjs/common';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';
import { IFindAllEntity } from '../../../domain/common/interfaces/IFindAllEntity';

@Injectable()
export class ListAllVehiclesUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: IFindAllEntity<Vehicle>,
  ) {}

  async execute(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findAll();
  }
}
