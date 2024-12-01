import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';
import { VehicleDocument } from './schemas/Vehicle.schema';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';

@Injectable()
export class MongooseVehicleRepository implements VehicleRepository {
  constructor(
    @InjectModel('Vehicle') private vehicleModel: Model<VehicleDocument>,
  ) {}

  async save(vehicle: Vehicle): Promise<Vehicle> {
    const created = new this.vehicleModel(vehicle);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<Vehicle | null> {
    const doc = await this.vehicleModel
      .findOne({ _id: id, deleted_at: null })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findAll(): Promise<Vehicle[]> {
    const docs = await this.vehicleModel
      .find({ deleted_at: null })
      .sort({ created_at: -1 })
      .exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  private toDomain(doc: VehicleDocument): Vehicle {
    return new Vehicle(
      doc.placa,
      doc.chassi,
      doc.renavam,
      doc.modelo,
      doc.marca,
      doc.ano,
      doc.createdAt,
      doc.updatedAt,
      doc.deletedAt,
      doc._id.toString(),
    );
  }
}