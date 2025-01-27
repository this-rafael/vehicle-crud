import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';
import { ISaveEntity } from '../../../domain/common/interfaces/ISaveEntity';
import { CreateVehicleDto } from '../dto/CreateVehicle.dto';
import { CannotCreateVehicleException } from '../../../domain/common/exceptions/CannotCreateVehicle.exception';

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: ISaveEntity<Vehicle>,
  ) {}

  async execute(createDto: CreateVehicleDto): Promise<Vehicle> {
    try {
      const vehicle = new Vehicle(
        createDto.placa,
        createDto.chassi,
        createDto.renavam,
        createDto.modelo,
        createDto.marca,
        createDto.ano,
      );

      return await this.vehicleRepository.save(vehicle);
    } catch (e: any) {
      throw new CannotCreateVehicleException(
        JSON.stringify(createDto),
        e.message,
      );
    }
  }
}
