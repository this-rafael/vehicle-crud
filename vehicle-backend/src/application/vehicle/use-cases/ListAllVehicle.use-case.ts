import { Injectable, Inject } from '@nestjs/common';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';

@Injectable()
export class ListAllVehiclesUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll();
  }
}
