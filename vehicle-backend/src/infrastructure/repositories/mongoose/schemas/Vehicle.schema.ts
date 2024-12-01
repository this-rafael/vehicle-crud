import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = VehicleSchema & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class VehicleSchema {
  @Prop({ required: true })
  placa: string;

  @Prop({ required: true })
  chassi: string;

  @Prop({ required: true })
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

VehicleMongooseSchema.index(
  { placa: 1, deletedAt: 1 },
  { unique: true, sparse: true },
);
VehicleMongooseSchema.index(
  { chassi: 1, deletedAt: 1 },
  { unique: true, sparse: true },
);
VehicleMongooseSchema.index(
  { renavam: 1, deletedAt: 1 },
  { unique: true, sparse: true },
);
