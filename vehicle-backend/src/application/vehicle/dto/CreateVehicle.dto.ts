import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Length } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'KAZ 2Y5' })
  @IsString()
  @IsNotEmpty()
  @Length(7, 7)
  placa: string;

  @ApiProperty({ example: '9BWZZZ377A3151' })
  @IsString()
  @IsNotEmpty()
  chassi: string;

  @ApiProperty({ example: '012345678911' })
  @IsString()
  @IsNotEmpty()
  renavam: string;

  @ApiProperty({ example: 'Impala Sedan 4 portas' })
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty({ example: 'Chevrolet' })
  @IsString()
  @IsNotEmpty()
  marca: string;

  @ApiProperty({ example: 1964 })
  @IsNumber()
  @IsNotEmpty()
  ano: number;
}
