import { ISearchEntity } from '../../../domain/common/interfaces/ISearchEntity';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';
import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepository } from '../../../domain/vehicle/repositories/Vehicle.repository';
import { SearchVehicleDto } from '../dto/SearchVehicle.dto';
import { PaginationVehicleDto } from '../dto/PaginationVehicle.dto';
import { GenericWhere } from '../../../domain/common/types/GenericWhere';

export type VehicleWhere = GenericWhere<Vehicle>;

@Injectable()
export class SearchVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private searchVehicleRepository: ISearchEntity<Vehicle>,
  ) {}

  async execute(criteria: SearchVehicleDto): Promise<PaginationVehicleDto> {
    const order = this.defineOrder(criteria);
    const where = this.defineWhere(criteria);

    const vehicles = await this.searchVehicleRepository.search(
      {
        take: criteria.take,
        skip: criteria.skip,
        order,
        where,
      },
      criteria.selectedFields.split(',').map((e) => e as keyof Vehicle),
    );

    return vehicles as PaginationVehicleDto;
  }

  private defineOrder(
    criteria: SearchVehicleDto,
  ): Partial<Record<keyof Vehicle, 'asc' | 'desc'>> {
    const { orderByYear, orderByName, orderByBrand } = criteria;

    const response: Partial<Record<keyof Vehicle, 'asc' | 'desc'>> = {};

    if (orderByYear) {
      response.ano = orderByYear;
    }

    if (orderByName) {
      response.modelo = orderByName;
    }

    if (orderByBrand) {
      response.marca = orderByBrand;
    }

    return response;
  }

  private defineWhere(criteria: SearchVehicleDto): VehicleWhere {
    const { brandLike, year, nameLike } = criteria;

    const response: VehicleWhere = {};

    if (brandLike) {
      response.marca = { $like: brandLike };
    }

    if (year) {
      response.ano = { $eq: year };
    }

    if (nameLike) {
      response.modelo = { $like: nameLike };
    }

    return response;
  }
}
