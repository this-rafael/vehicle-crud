import { expect } from 'chai';
import * as sinon from 'sinon';
import { UpdateVehicleUseCase } from '../../src/application/vehicle/use-cases/UpdateVehicle.use-case';
import { VehicleRepository } from '../../src/domain/vehicle/repositories/Vehicle.repository';
import { UpdateVehicleDto } from '../../src/application/vehicle/dto/UpdateVehicle.dto';
import { Vehicle } from '../../src/domain/vehicle/entities/Vehicle.entity';
import { CannotUpdateVehicleException } from '../../src/domain/common/exceptions/CannotUpdateVehicle.exception';
import { MongooseVehicleRepository } from '../../src/infrastructure/repositories/mongoose/MongoVehicle.repository';

describe('UpdateVehicleUseCase', () => {
  let useCase: UpdateVehicleUseCase;
  let repositoryStub: sinon.SinonStubbedInstance<VehicleRepository>;

  const mockVehicle = new Vehicle(
    'ABC-1234',
    '9BWZZZ377VT004251',
    '12345678901',
    'Gol',
    'Volkswagen',
    2022,
  );

  const updateDto: UpdateVehicleDto = {
    modelo: 'Polo',
    ano: 2023,
  };

  beforeEach(() => {
    repositoryStub = sinon.createStubInstance<VehicleRepository>(
      MongooseVehicleRepository,
    );
    useCase = new UpdateVehicleUseCase(repositoryStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should update the vehicle successfully', async () => {
    const vehicleId = '123';
    const updatedVehicle = { ...mockVehicle, ...updateDto } as Vehicle;

    repositoryStub.update.resolves(updatedVehicle);

    const result = await useCase.execute(vehicleId, updateDto);

    expect(result.modelo).to.equal(updateDto.modelo);
    expect(result.ano).to.equal(updateDto.ano);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.update.calledOnce).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.update.calledWith(vehicleId, updateDto as Vehicle)).to
      .be.true;
  });

  it('should throw CannotUpdateVehicleException if vehicle update fails', async () => {
    const vehicleId = '123';

    repositoryStub.update.resolves(null);

    try {
      await useCase.execute(vehicleId, updateDto);
    } catch (error) {
      expect(error).to.be.an.instanceOf(CannotUpdateVehicleException);
      expect(error.message).to.equal(
        `Cannot update vehicle with {"id":"123","modelo":"Polo","ano":2023} because they not exists or are be deleted`,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(repositoryStub.update.calledOnce).to.be.true;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(repositoryStub.update.calledWith(vehicleId, updateDto as Vehicle))
        .to.be.true;
    }
  });
});
