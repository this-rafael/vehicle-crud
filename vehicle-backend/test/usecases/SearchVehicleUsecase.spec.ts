import { expect } from 'chai';
import * as sinon from 'sinon';
import { SearchVehicleUseCase } from '../../src/application/vehicle/use-cases/SearchVehicle.use-case';
import { VehicleRepository } from '../../src/domain/vehicle/repositories/Vehicle.repository';
import { Vehicle } from '../../src/domain/vehicle/entities/Vehicle.entity';
import { SearchVehicleDto } from '../../src/application/vehicle/dto/SearchVehicle.dto';
import { PaginationVehicleDto } from '../../src/application/vehicle/dto/PaginationVehicle.dto';
import { MongooseVehicleRepository } from '../../src/infrastructure/repositories/mongoose/MongoVehicle.repository';

describe('SearchVehicleUseCase', () => {
  let useCase: SearchVehicleUseCase;
  let repositoryStub: sinon.SinonStubbedInstance<VehicleRepository>;

  const mockVehicles = [
    new Vehicle(
      'ABC1234',
      '9BWZZZ377VT004251',
      '12345678901',
      'Gol',
      'Volkswagen',
      2022,
    ),
    new Vehicle(
      'XYZ5678',
      '8XTZZZ123KT002314',
      '98765432109',
      'Civic',
      'Honda',
      2021,
    ),
  ];

  beforeEach(() => {
    repositoryStub = sinon.createStubInstance<VehicleRepository>(
      MongooseVehicleRepository,
    );
    useCase = new SearchVehicleUseCase(repositoryStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return vehicles based on search criteria', async () => {
    const searchDto: SearchVehicleDto = {
      take: 10,
      skip: 0,
      selectedFields: 'placa,modelo,marca',
      brandLike: 'Volkswagen',
      year: 2022,
      nameLike: 'Gol',
      orderByYear: 'asc',
      orderByName: 'desc',
      orderByBrand: 'asc',
    };

    const expectedOrder = { ano: 'asc', modelo: 'desc', marca: 'asc' };
    const expectedWhere = {
      marca: { $like: 'Volkswagen' },
      ano: { $eq: 2022 },
      modelo: { $like: 'Gol' },
    };

    const paginationResult: PaginationVehicleDto = {
      take: 10,
      skip: 0,
      total: 2,
      items: mockVehicles,
      order: expectedOrder as any,
    };

    repositoryStub.search.resolves(paginationResult);

    const result = await useCase.execute(searchDto);

    expect(result).to.eql(paginationResult);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.search.calledOnce).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(
      repositoryStub.search.calledWithMatch({
        where: expectedWhere as any,
        order: expectedOrder as any,
      }),
    ).to.be.true;
  });

  it('should generate correct order object from criteria', () => {
    const searchDto: SearchVehicleDto = {
      take: 10,
      skip: 0,
      selectedFields: 'placa,modelo,marca',
      brandLike: null,
      year: null,
      nameLike: null,
      orderByYear: 'asc',
      orderByName: 'desc',
      orderByBrand: null,
    };

    const expectedOrder = { ano: 'asc', modelo: 'desc' };

    const result = useCase['defineOrder'](searchDto);

    expect(result).to.eql(expectedOrder);
  });

  it('should generate correct where object from criteria', () => {
    const searchDto: SearchVehicleDto = {
      take: 10,
      skip: 0,
      selectedFields: 'placa,modelo,marca',
      brandLike: 'Volkswagen',
      year: 2022,
      nameLike: 'Gol',
      orderByYear: null,
      orderByName: null,
      orderByBrand: null,
    };

    const expectedWhere = {
      marca: { $like: 'Volkswagen' },
      ano: { $eq: 2022 },
      modelo: { $like: 'Gol' },
    };

    const result = useCase['defineWhere'](searchDto);

    expect(result).to.eql(expectedWhere);
  });

  it('should call repository with default order and where when no criteria are provided', async () => {
    const searchDto: SearchVehicleDto = {
      take: 10,
      skip: 0,
      selectedFields: 'placa,modelo,marca',
      brandLike: null,
      year: null,
      nameLike: null,
      orderByYear: null,
      orderByName: null,
      orderByBrand: null,
    };

    const paginationResult: PaginationVehicleDto = {
      take: 10,
      skip: 0,
      total: 0,
      items: [],
      order: {} as any,
    };

    repositoryStub.search.resolves(paginationResult);

    const result = await useCase.execute(searchDto);

    expect(result).to.eql(paginationResult);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.search.calledOnce).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.search.calledWithMatch({ where: {}, order: {} })).to
      .be.true;
  });
});
