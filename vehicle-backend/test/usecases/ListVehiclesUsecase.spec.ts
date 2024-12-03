import { expect } from 'chai';
import * as sinon from 'sinon';
import { VehicleRepository } from '../../src/domain/vehicle/repositories/Vehicle.repository';
import { Vehicle } from '../../src/domain/vehicle/entities/Vehicle.entity';
import { MongooseVehicleRepository } from '../../src/infrastructure/repositories/mongoose/MongoVehicle.repository';
import { ListAllVehiclesUseCase } from '../../src/application/vehicle/use-cases/ListAllVehicle.use-case';

describe('ListVehiclesUseCase', () => {
  let useCase: ListAllVehiclesUseCase;
  let repositoryStub: sinon.SinonStubbedInstance<VehicleRepository>;

  const mockVehicles = [
    new Vehicle(
      'ABC-1234',
      '9BWZZZ377VT004251',
      '12345678901',
      'Gol',
      'Volkswagen',
      2022,
    ),
    new Vehicle(
      'XYZ-5678',
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
    useCase = new ListAllVehiclesUseCase(repositoryStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a list of vehicles', async () => {
    repositoryStub.findAll.resolves(mockVehicles);

    const result = await useCase.execute();

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(2);
    expect(result[0]).to.be.an.instanceOf(Vehicle);
    expect(result[0].placa).to.equal(mockVehicles[0].placa);
    expect(result[1].placa).to.equal(mockVehicles[1].placa);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.findAll.calledOnce).to.be.true;
  });

  it('should return an empty list if no vehicles are found', async () => {
    repositoryStub.findAll.resolves([]);

    const result = await useCase.execute();

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.findAll.calledOnce).to.be.true;
  });
});
