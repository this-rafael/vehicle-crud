import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';
import { VehicleDocument } from './schemas/Vehicle.schema';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';
import { Pagination } from 'src/domain/common/types/Pagination';
import { SearchCriteria } from 'src/domain/common/types/SearchCriteria';

@Injectable()
export class MongooseVehicleRepository implements VehicleRepository {
  constructor(
    @InjectModel('Vehicle') private vehicleModel: Model<VehicleDocument>,
  ) {}

  async search(
    query: SearchCriteria<Vehicle>,
    selection: Array<keyof Vehicle>,
  ): Promise<Pagination<Vehicle>> {
    const { order, skip = 0, take = 10, where } = query;

    console.dir(where);

    const modifiedWhere: Record<string, any> = {};

    for (const key in where) {
      const operator = Object.keys(where[key] || {})[0];
      if (operator === '$like') {
        modifiedWhere[key] = {
          $regex: new RegExp(where[key][operator], 'i'),
        };
      } else {
        modifiedWhere[key] = where[key];
      }
    }

    const [docs, total] = await Promise.all([
      this.vehicleModel
        .find({
          ...modifiedWhere,
          deletedAt: null,
        })
        .sort(order || { createdAt: -1 })
        .skip(skip)
        .limit(take)
        .select(selection.join(' '))
        .exec(),
      this.vehicleModel.countDocuments(modifiedWhere),
    ]);

    return {
      take,
      skip,
      total,
      items: docs.map((doc) => this.toDomain(doc)),
      order,
    };
  }
  async delete(id: string): Promise<void> {
    try {
      await this.vehicleModel.updateOne({ _id: id }, { deletedAt: new Date() });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error: unknown) {
      throw new Error('Vehicle not found');
    }
  }

  async save(vehicle: Vehicle): Promise<Vehicle> {
    const created = new this.vehicleModel(vehicle);
    const doc = await created.save();
    return this.toDomain(doc);
  }

  async findById(id: string): Promise<Vehicle | null> {
    const doc = await this.vehicleModel
      .findOne({ _id: id, deletedAt: null })
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findAll(): Promise<Vehicle[]> {
    const docs = await this.vehicleModel
      .find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async update(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle | null> {
    const updatedDoc = await this.vehicleModel
      .findOneAndUpdate({ _id: id, deleted_at: null }, vehicle, { new: true })
      .exec();

    return updatedDoc ? this.toDomain(updatedDoc) : null;
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
