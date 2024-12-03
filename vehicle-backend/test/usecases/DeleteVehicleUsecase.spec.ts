import { expect } from 'chai';
import * as sinon from 'sinon';
import { DeleteVehicleUseCase } from '../../src/application/vehicle/use-cases/DeleteVehicle.use-case';
import { VehicleRepository } from '../../src/domain/vehicle/repositories/Vehicle.repository';
import { Vehicle } from '../../src/domain/vehicle/entities/Vehicle.entity';
import { NotFoundVehicleException } from '../../src/domain/common/exceptions/NotFoundVehicle.exception';
import { CannotDeleteVehicleException } from '../../src/domain/common/exceptions/CannotDeleteVehicle.exception';
import { MongooseVehicleRepository } from '../../src/infrastructure/repositories/mongoose/MongoVehicle.repository';

describe('DeleteVehicleUseCase', () => {
  let useCase: DeleteVehicleUseCase;
  let findByIdRepositoryStub: sinon.SinonStubbedInstance<VehicleRepository>;
  let deleteEntityRepositoryStub: sinon.SinonStubbedInstance<VehicleRepository>;

  const mockVehicle = new Vehicle(
    'ABC-1234',
    '9BWZZZ377VT004251',
    '12345678901',
    'Gol',
    'Volkswagen',
    2022,
  );

  beforeEach(() => {
    findByIdRepositoryStub = sinon.createStubInstance<VehicleRepository>(
      MongooseVehicleRepository,
    );
    deleteEntityRepositoryStub = sinon.createStubInstance<VehicleRepository>(
      MongooseVehicleRepository,
    );
    useCase = new DeleteVehicleUseCase(
      findByIdRepositoryStub,
      deleteEntityRepositoryStub,
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should delete the vehicle successfully', async () => {
    const vehicleId = '123';

    findByIdRepositoryStub.findById.resolves(mockVehicle);
    deleteEntityRepositoryStub.delete.resolves();

    await useCase.execute(vehicleId);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(findByIdRepositoryStub.findById.calledOnce).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(findByIdRepositoryStub.findById.calledWith(vehicleId)).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(deleteEntityRepositoryStub.delete.calledOnce).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(deleteEntityRepositoryStub.delete.calledWith(vehicleId)).to.be.true;
  });

  it('should throw NotFoundVehicleException if vehicle not found', async () => {
    const vehicleId = '123';

    findByIdRepositoryStub.findById.resolves(null);

    try {
      await useCase.execute(vehicleId);
    } catch (error) {
      expect(error).to.be.an.instanceOf(NotFoundVehicleException);
      expect(error.message).to.equal(`Vehicle with id ${vehicleId} not found`);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(findByIdRepositoryStub.findById.calledOnce).to.be.true;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(findByIdRepositoryStub.findById.calledWith(vehicleId)).to.be.true;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(deleteEntityRepositoryStub.delete.notCalled).to.be.true;
    }
  });

  it('should throw CannotDeleteVehicleException if deletion fails', async () => {
    const vehicleId = '123';

    findByIdRepositoryStub.findById.resolves(mockVehicle);
    deleteEntityRepositoryStub.delete.rejects(new Error('Deletion error'));

    try {
      await useCase.execute(vehicleId);
    } catch (error) {
      expect(error).to.be.an.instanceOf(CannotDeleteVehicleException);
      expect(error.message).to.equal(
        `Vehicle with id ${vehicleId} cannot be deleted`,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(findByIdRepositoryStub.findById.calledOnce).to.be.true;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(findByIdRepositoryStub.findById.calledWith(vehicleId)).to.be.true;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(deleteEntityRepositoryStub.delete.calledOnce).to.be.true;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(deleteEntityRepositoryStub.delete.calledWith(vehicleId)).to.be
        .true;
    }
  });
});
