import { IDeleteEntity } from '../../../domain/common/interfaces/IDeleteEntity';
import { IFindByIdEntity } from '../../../domain/common/interfaces/IFindByIdEntity';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';
import { Inject } from '@nestjs/common';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';

export class DeleteVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private findByIdRepository: IFindByIdEntity<Vehicle>,
    @Inject(VehicleRepository)
    private deleteEntityRepository: IDeleteEntity,
  ) {}

  async execute(id: string): Promise<void> {
    const vehicle = await this.findByIdRepository.findById(id);

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    await this.deleteEntityRepository.delete(id);
  }
}
