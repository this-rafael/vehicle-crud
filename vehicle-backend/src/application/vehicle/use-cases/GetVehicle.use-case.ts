import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';

@Injectable()
export class GetVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }
}
