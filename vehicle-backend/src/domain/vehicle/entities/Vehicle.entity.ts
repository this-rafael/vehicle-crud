import { ApiProperty } from '@nestjs/swagger';
import { IEntity } from 'src/domain/common/interfaces/IEntity';

export class Vehicle implements IEntity {
  @ApiProperty({ example: 1 })
  id: string;

  @ApiProperty({ example: 'KAZ 2Y5' })
  placa: string;

  @ApiProperty({ example: '9BWZZZ377A3151' })
  chassi: string;

  @ApiProperty({ example: '012345678911' })
  renavam: string;

  @ApiProperty({ example: 'Impala Sedan 4 portas' })
  modelo: string;

  @ApiProperty({ example: 'Chevrolet' })
  marca: string;

  @ApiProperty({ example: 1964 })
  ano: number;

  @ApiProperty({ example: '2024-00-01T00:00:00.000Z' })
  createdAt?: Date;

  @ApiProperty({ example: '2024-00-01T00:00:00.000Z' })
  updatedAt?: Date;

  @ApiProperty({ example: null })
  deletedAt?: Date | null;

  constructor(
    placa: string,
    chassi: string,
    renavam: string,
    modelo: string,
    marca: string,
    ano: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null,
    id?: string,
  ) {
    this.id = id;
    this.placa = placa;
    this.chassi = chassi;
    this.renavam = renavam;
    this.modelo = modelo;
    this.marca = marca;
    this.ano = ano;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public equals(entity: IEntity): boolean {
    const vehicle = entity as Vehicle;
    return (
      this.id === vehicle.id &&
      this.placa === vehicle.placa &&
      this.chassi === vehicle.chassi &&
      this.renavam === vehicle.renavam &&
      this.modelo === vehicle.modelo &&
      this.marca === vehicle.marca &&
      this.ano === vehicle.ano
    );
  }

  public hashCode(): number {
    const string = `${this.id}${this.placa}${this.chassi}${this.renavam}${this.modelo}${this.marca}${this.ano}`;
    return string.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  public toString(): string {
    return `Vehicle ${this.marca} ${this.modelo} ${this.ano} ${this.placa} #Id: ${this.id}`;
  }
}
