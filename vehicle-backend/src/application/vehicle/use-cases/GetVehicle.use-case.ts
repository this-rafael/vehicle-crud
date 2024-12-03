import { Injectable, Inject } from '@nestjs/common';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';
import { IFindByIdEntity } from '../../../domain/common/interfaces/IFindByIdEntity';
import { NotFoundVehicleException } from '../../../domain/common/exceptions/NotFoundVehicle.exception';

@Injectable()
export class GetVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: IFindByIdEntity<Vehicle>,
  ) {}

  async execute(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) {
      throw new NotFoundVehicleException(id);
    }
    return vehicle;
  }
}
