import { Module } from '@nestjs/common';
import { CreateVehicleUseCase } from '../../application/vehicle/use-cases/CreateVehicle.use-case';
import { VehicleController } from '../interfaces/rest/controllers/Vehicle.controller';
import { MongooseRepositoryModule } from './Mongoose.module';
import { GetVehicleUseCase } from '../../application/vehicle/use-cases/GetVehicle.use-case';
import { ListAllVehiclesUseCase } from '../../application/vehicle/use-cases/ListAllVehicle.use-case';

@Module({
  imports: [MongooseRepositoryModule],
  providers: [CreateVehicleUseCase, GetVehicleUseCase, ListAllVehiclesUseCase],
  exports: [CreateVehicleUseCase, GetVehicleUseCase, ListAllVehiclesUseCase],
  controllers: [VehicleController],
})
export class VehicleApplicationModule {}
