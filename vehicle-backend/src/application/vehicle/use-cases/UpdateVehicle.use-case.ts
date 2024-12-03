import { Inject, Injectable } from '@nestjs/common';
import { UpdateVehicleDto } from '../dto/UpdateVehicle.dto';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';
import { IUpdateEntity } from '../../../domain/common/interfaces/IUpdateEntity';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';
import { CannotUpdateVehicleException } from '../../../domain/common/exceptions/CannotUpdateVehicle.exception';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: IUpdateEntity<Vehicle>,
  ) {}

  async execute(id: string, updateDto: UpdateVehicleDto): Promise<Vehicle> {
    const updatedVehicle = await this.vehicleRepository.update(id, updateDto);

    if (!updatedVehicle) {
      throw new CannotUpdateVehicleException(
        JSON.stringify({ id, ...updateDto }),
      );
    }

    return updatedVehicle;
  }
}
