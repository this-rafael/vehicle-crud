import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Vehicle } from '../../../../domain/vehicle/entities/Vehicle.entity';
import { CreateVehicleDto } from '../../../../application/vehicle/dto/CreateVehicle.dto';
import { CreateVehicleUseCase } from '../../../../application/vehicle/use-cases/CreateVehicle.use-case';
import { GetVehicleUseCase } from '../../../../application/vehicle/use-cases/GetVehicle.use-case';
import { ListAllVehiclesUseCase } from '../../../../application/vehicle/use-cases/ListAllVehicle.use-case';
import { DeleteVehicleUseCase } from '../../../../application/vehicle/use-cases/DeleteVehicle.use-case';
import { UpdateVehicleDto } from '../../../../application/vehicle/dto/UpdateVehicle.dto';
import { UpdateVehicleUseCase } from '../../../../application/vehicle/use-cases/UpdateVehicle.use-case';
import { SearchVehicleUseCase } from '../../../../application/vehicle/use-cases/SearchVehicle.use-case';
import { PaginationVehicleDto } from '../../../../application/vehicle/dto/PaginationVehicle.dto';
import { SearchVehiclePipe } from '../../../pipes/SearchVehicle.pipe';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly getVehicleUseCase: GetVehicleUseCase,
    private readonly listAllVehicleUseCase: ListAllVehiclesUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly searchVehicleUseCase: SearchVehicleUseCase,
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

  @Get('/search')
  @ApiOperation({ summary: 'Buscar veículos' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [PaginationVehicleDto],
  })
  search(
    @Query(SearchVehiclePipe) searchCriteria: any,
  ): Promise<PaginationVehicleDto> {
    return this.searchVehicleUseCase.execute(searchCriteria);
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

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um veículo pelo ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteVehicleUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um veículo pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Vehicle,
  })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.updateVehicleUseCase.execute(id, updateDto);
  }
}
