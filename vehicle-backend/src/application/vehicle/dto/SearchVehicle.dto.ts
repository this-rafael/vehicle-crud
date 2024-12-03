import { ApiProperty } from '@nestjs/swagger';

export class SearchVehicleDto {
  @ApiProperty({
    example: 'placa, chassi, renavam, modelo, marca, ano',
    nullable: true,
    required: false,
  })
  selectedFields: string;

  take: number;

  orderByName: 'asc' | 'desc';

  orderByYear: 'asc' | 'desc';

  orderByBrand: 'asc' | 'desc';

  skip: number;

  nameLike?: string;

  brandLike?: string;

  year?: number;
}
