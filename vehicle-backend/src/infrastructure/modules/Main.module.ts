import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleApplicationModule } from './Application.module';
import { config } from 'dotenv';
config();
import * as mongoose from 'mongoose';

mongoose.set('debug', true);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://admin:password@localhost:27017'),
    VehicleApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
