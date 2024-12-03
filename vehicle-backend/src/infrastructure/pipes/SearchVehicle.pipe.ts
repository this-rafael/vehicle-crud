import { PipeTransform, Injectable } from '@nestjs/common';
import { SearchVehicleDto } from '../../application/vehicle/dto/SearchVehicle.dto';

@Injectable()
export class SearchVehiclePipe implements PipeTransform {
  transform(value: any): SearchVehicleDto {
    const {
      selectedFields,
      take,
      skip,
      orderByYear,
      orderByName,
      orderByBrand,
      nameLike,
      brandLike,
      year,
    } = value;

    const dto = {} as SearchVehicleDto;
    dto.selectedFields = selectedFields;
    dto.take = parseInt(take);
    dto.skip = parseInt(skip);
    dto.orderByYear = orderByYear;
    dto.orderByName = orderByName;
    dto.orderByBrand = orderByBrand;
    dto.nameLike = nameLike;
    dto.brandLike = brandLike;
    dto.year = year ? parseInt(year) : undefined;

    return dto;
  }
}
