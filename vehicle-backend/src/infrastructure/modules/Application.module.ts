import { Module } from '@nestjs/common';
import { CreateVehicleUseCase } from '../../application/vehicle/use-cases/CreateVehicle.use-case';
import { VehicleController } from '../interfaces/rest/controllers/Vehicle.controller';
import { MongooseRepositoryModule } from './Mongoose.module';
import { GetVehicleUseCase } from '../../application/vehicle/use-cases/GetVehicle.use-case';
import { ListAllVehiclesUseCase } from '../../application/vehicle/use-cases/ListAllVehicle.use-case';
import { DeleteVehicleUseCase } from '../../application/vehicle/use-cases/DeleteVehicle.use-case';

@Module({
  imports: [MongooseRepositoryModule],
  providers: [
    CreateVehicleUseCase,
    GetVehicleUseCase,
    ListAllVehiclesUseCase,
    DeleteVehicleUseCase,
  ],
  exports: [
    CreateVehicleUseCase,
    GetVehicleUseCase,
    ListAllVehiclesUseCase,
    DeleteVehicleUseCase,
  ],
  controllers: [VehicleController],
})
export class VehicleApplicationModule {}
