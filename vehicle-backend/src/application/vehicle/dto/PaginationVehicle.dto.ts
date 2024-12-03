import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '../../../domain/common/types/Pagination';
import { Vehicle } from '../../../domain/vehicle/entities/Vehicle.entity';

export class PaginationVehicleDto implements Pagination<Vehicle> {
  @ApiProperty({
    example: 10,
  })
  take: number;

  @ApiProperty({
    example: 0,
  })
  skip: number;

  @ApiProperty({
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Order by field',
  })
  order: {
    id?: 'asc' | 'desc';
    placa?: 'asc' | 'desc';
    chassi?: 'asc' | 'desc';
    renavam?: 'asc' | 'desc';
    modelo?: 'asc' | 'desc';
    marca?: 'asc' | 'desc';
    ano?: 'asc' | 'desc';
    createdAt?: 'asc' | 'desc';
    updatedAt?: 'asc' | 'desc';
    deletedAt?: 'asc' | 'desc';
    equals?: 'asc' | 'desc';
    hashCode?: 'asc' | 'desc';
    toString?: 'asc' | 'desc';
  };

  @ApiProperty({
    type: [Vehicle],
    description: 'List of vehicles',
  })
  items: Vehicle[];
}
