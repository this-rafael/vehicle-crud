import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleApplicationModule } from './Application.module';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://admin:password@localhost:27017\n'),
    VehicleApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
