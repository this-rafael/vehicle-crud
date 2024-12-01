import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = VehicleSchema & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class VehicleSchema {
  @Prop({ required: true, unique: true })
  placa: string;

  @Prop({ required: true, unique: true })
  chassi: string;

  @Prop({ required: true, unique: true })
  renavam: string;

  @Prop({ required: true })
  modelo: string;

  @Prop({ required: true })
  marca: string;

  @Prop({ required: true })
  ano: number;

  @Prop({ default: null })
  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}

export const VehicleMongooseSchema =
  SchemaFactory.createForClass(VehicleSchema);
