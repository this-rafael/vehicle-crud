import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleMongooseSchema } from '../repositories/mongoose/schemas/Vehicle.schema';
import { MongooseVehicleRepository } from '../repositories/mongoose/MongoVehicle.repository';
import { VehicleRepository } from '../../domain/vehicle/repositories/Vehicle.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Vehicle', schema: VehicleMongooseSchema },
    ]),
  ],
  providers: [
    MongooseVehicleRepository,
    {
      provide: VehicleRepository,
      useExisting: MongooseVehicleRepository,
    },
  ],

  exports: [VehicleRepository],
})
export class MongooseRepositoryModule {}
