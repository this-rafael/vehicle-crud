import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Vehicle } from '../../../../domain/vehicle/entities/Vehicle.entity';
import { CreateVehicleDto } from '../../../../application/vehicle/dto/CreateVehicle.dto';
import { CreateVehicleUseCase } from '../../../../application/vehicle/use-cases/CreateVehicle.use-case';
import { GetVehicleUseCase } from '../../../../application/vehicle/use-cases/GetVehicle.use-case';
import { ListAllVehiclesUseCase } from '../../../../application/vehicle/use-cases/ListAllVehicle.use-case';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly getVehicleUseCase: GetVehicleUseCase,
    private readonly listAllVehicleUseCase: ListAllVehiclesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo veículo' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Vehicle,
  })
  create(@Body() createDto: CreateVehicleDto): Promise<Vehicle> {
    return this.createVehicleUseCase.execute(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um veículo pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Vehicle,
  })
  getById(@Param('id') id: string): Promise<Vehicle> {
    return this.getVehicleUseCase.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Vehicle],
  })
  listAll(): Promise<Vehicle[]> {
    return this.listAllVehicleUseCase.execute();
  }
}
