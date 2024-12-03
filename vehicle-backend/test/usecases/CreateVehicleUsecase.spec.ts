import { expect } from 'chai';
import * as sinon from 'sinon';
import { MongooseVehicleRepository } from '../../src/infrastructure/repositories/mongoose/MongoVehicle.repository';
import { CreateVehicleUseCase } from '../../src/application/vehicle/use-cases/CreateVehicle.use-case';
import { CreateVehicleDto } from '../../src/application/vehicle/dto/CreateVehicle.dto';
import { Vehicle } from '../../src/domain/vehicle/entities/Vehicle.entity';
import { ApplicationException } from '../../src/domain/common/exceptions/Application.exception';
import { CannotCreateVehicleException } from '../../src/domain/common/exceptions/CannotCreateVehicle.exception';

describe('CreateVehicleUseCase', () => {
  let useCase: CreateVehicleUseCase;
  let repositoryStub: sinon.SinonStubbedInstance<MongooseVehicleRepository>;

  beforeEach(() => {
    repositoryStub = sinon.createStubInstance(MongooseVehicleRepository);

    useCase = new CreateVehicleUseCase(repositoryStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Should be save correctly an vehicle', async () => {
    const createDto: CreateVehicleDto = {
      placa: 'ABC-1234',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      modelo: 'Gol',
      marca: 'Volkswagen',
      ano: 2022,
    };

    const savedVehicle = new Vehicle(
      createDto.placa,
      createDto.chassi,
      createDto.renavam,
      createDto.modelo,
      createDto.marca,
      createDto.ano,
    );

    repositoryStub.save.resolves(savedVehicle);

    const result = await useCase.execute(createDto);

    expect(result).to.be.an.instanceOf(Vehicle);
    expect(result.placa).to.equal(createDto.placa);
    expect(result.chassi).to.equal(createDto.chassi);
    expect(result.renavam).to.equal(createDto.renavam);
    expect(result.modelo).to.equal(createDto.modelo);
    expect(result.marca).to.equal(createDto.marca);
    expect(result.ano).to.equal(createDto.ano);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(repositoryStub.save.calledOnce).to.be.true;
  });

  it('should throw an CannotCreateVehicle Exception when any error occurs', async () => {
    const createDto: CreateVehicleDto = {
      placa: 'ABC-1234',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      modelo: 'Gol',
      marca: 'Volkswagen',
      ano: 2022,
    };

    repositoryStub.save.rejects(new Error('Erro ao salvar veículo'));

    try {
      await useCase.execute(createDto);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ApplicationException);
      expect(error).to.be.an.instanceOf(CannotCreateVehicleException);
      expect(error.message).to.equal(
        `Cannot create vehicle with {"placa":"ABC-1234","chassi":"9BWZZZ377VT004251","renavam":"12345678901","modelo":"Gol","marca":"Volkswagen","ano":2022} because Erro ao salvar veículo`,
      );
    }
  });
});
