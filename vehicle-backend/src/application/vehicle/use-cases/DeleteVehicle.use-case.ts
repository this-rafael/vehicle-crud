import { IDeleteEntity } from '../../../domain/common/interfaces/IDeleteEntity';
import { IFindByIdEntity } from '../../../domain/common/interfaces/IFindByIdEntity';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';
import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';
import { NotFoundVehicleException } from '../../../domain/common/exceptions/NotFoundVehicle.exception';
import { CannotDeleteVehicleException } from '../../../domain/common/exceptions/CannotDeleteVehicle.exception';

@Injectable()
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
      throw new NotFoundVehicleException(id);
    }

    try {
      await this.deleteEntityRepository.delete(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      throw new CannotDeleteVehicleException(id);
    }
  }
}
