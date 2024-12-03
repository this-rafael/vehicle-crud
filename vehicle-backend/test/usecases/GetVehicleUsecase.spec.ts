import { expect } from 'chai';
import * as sinon from 'sinon';
import { GetVehicleUseCase } from '../../src/application/vehicle/use-cases/GetVehicle.use-case';
import { VehicleRepository } from '../../src/domain/vehicle/repositories/Vehicle.repository';
import { Vehicle } from '../../src/domain/vehicle/entities/Vehicle.entity';
import { NotFoundVehicleException } from '../../src/domain/common/exceptions/NotFoundVehicle.exception';
import { MongooseVehicleRepository } from '../../src/infrastructure/repositories/mongoose/MongoVehicle.repository';

describe('GetVehicleUseCase', () => {
  let useCase: GetVehicleUseCase;
  let repositoryStub: sinon.SinonStubbedInstance<VehicleRepository>;

  const mockVehicle = new Vehicle(
    'ABC-1234',
    '9BWZZZ377VT004251',
    '12345678901',
    'Gol',
    'Volkswagen',
    2022,
  );

  beforeEach(() => {
    repositoryStub = sinon.createStubInstance<VehicleRepository>(
      MongooseVehicleRepository,
    );
    useCase = new GetVehicleUseCase(repositoryStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return the vehicle if found', async () => {
    const vehicleId = '123';
    repositoryStub.findById.resolves(mockVehicle);

    const result = await useCase.execute(vehicleId);

    expect(result).to.be.an.instanceOf(Vehicle);
    expect(result.placa).to.equal(mockVehicle.placa);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.findById.calledOnce).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.findById.calledWith(vehicleId)).to.be.true;
  });

  it('should throw NotFoundVehicleException if vehicle not found', async () => {
    const vehicleId = '123';
    repositoryStub.findById.resolves(null);

    try {
      await useCase.execute(vehicleId);
    } catch (error) {
      expect(error).to.be.an.instanceOf(NotFoundVehicleException);
      expect(error.message).to.equal(`Vehicle with id ${vehicleId} not found`);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(repositoryStub.findById.calledOnce).to.be.true;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(repositoryStub.findById.calledWith(vehicleId)).to.be.true;
    }
  });
});
