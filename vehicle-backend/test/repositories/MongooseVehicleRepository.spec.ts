import { expect } from 'chai';
import * as sinon from 'sinon';
import { MongooseVehicleRepository } from '../../src/infrastructure/repositories/mongoose/MongoVehicle.repository';
import { Vehicle } from '../../src/domain/vehicle/entities/Vehicle.entity';
import { SearchCriteria } from '../../src/domain/common/types/SearchCriteria';

describe('MongooseVehicleRepository', () => {
  let repository: MongooseVehicleRepository;
  let vehicleModelStub: any;

  beforeEach(() => {
    vehicleModelStub = function (vehicleData: any) {
      return {
        ...vehicleData,
        save: sinon.stub().resolves(vehicleData),
      };
    };

    vehicleModelStub.find = sinon.stub();
    vehicleModelStub.findOne = sinon.stub();
    vehicleModelStub.findOneAndUpdate = sinon.stub();
    vehicleModelStub.updateOne = sinon.stub();
    vehicleModelStub.countDocuments = sinon.stub();

    repository = new MongooseVehicleRepository(vehicleModelStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('save', () => {
    it('should save a vehicle and return the saved vehicle', async () => {
      const vehicleData = new Vehicle(
        'ABC-1234',
        '9BWZZZ377VT004251',
        '12345678901',
        'Gol',
        'Volkswagen',
        2022,
      );

      const createdVehicle = {
        ...vehicleData,
        _id: 'someid',
        save: sinon.stub().resolvesThis(),
      };

      vehicleModelStub = function () {
        return createdVehicle;
      };

      repository = new MongooseVehicleRepository(vehicleModelStub);

      const result = await repository.save(vehicleData);

      expect(result).to.be.instanceOf(Vehicle);
      expect(result.id).to.equal('someid');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(createdVehicle.save.calledOnce).to.be.true;
    });
  });

  describe('findById', () => {
    it('should return a vehicle when found', async () => {
      const vehicleDoc = {
        _id: 'someid',
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Gol',
        marca: 'Volkswagen',
        ano: 2022,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vehicleModelStub.findOne.returns({
        exec: sinon.stub().resolves(vehicleDoc),
      });

      const result = await repository.findById('someid');

      expect(result).to.be.instanceOf(Vehicle);
      expect(result?.id).to.equal('someid');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(
        vehicleModelStub.findOne.calledWith({ _id: 'someid', deletedAt: null }),
      ).to.be.true;
    });

    it('should return null when vehicle not found', async () => {
      vehicleModelStub.findOne.returns({
        exec: sinon.stub().resolves(null),
      });

      const result = await repository.findById('nonexistentid');

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(result).to.be.null;
    });
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const vehicleDocs = [
        {
          _id: 'id1',
          placa: 'ABC-1234',
          chassi: '9BWZZZ377VT004251',
          renavam: '12345678901',
          modelo: 'Gol',
          marca: 'Volkswagen',
          ano: 2022,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          _id: 'id2',
          placa: 'DEF-5678',
          chassi: '1HGCM82633A004352',
          renavam: '09876543210',
          modelo: 'Civic',
          marca: 'Honda',
          ano: 2020,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      vehicleModelStub.find.returns({
        sort: sinon.stub().returns({
          exec: sinon.stub().resolves(vehicleDocs),
        }),
      });

      const result = await repository.findAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(vehicleModelStub.find.calledWith({ deletedAt: null })).to.be.true;
    });
  });

  describe('delete', () => {
    it('should soft delete a vehicle', async () => {
      vehicleModelStub.updateOne.resolves({ nModified: 1 });

      await repository.delete('someid');

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(
        vehicleModelStub.updateOne.calledWith(
          { _id: 'someid' },
          { deletedAt: sinon.match.date },
        ),
      ).to.be.true;
    });

    it('should throw an error if delete fails', async () => {
      vehicleModelStub.updateOne.rejects(new Error('Vehicle not found'));

      try {
        await repository.delete('nonexistentid');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal('Vehicle not found');
      }
    });
  });

  describe('update', () => {
    it('should update a vehicle and return the updated vehicle', async () => {
      const vehicleData = {
        modelo: 'Updated Model',
      };

      const updatedVehicleDoc = {
        _id: 'someid',
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Updated Model',
        marca: 'Volkswagen',
        ano: 2022,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vehicleModelStub.findOneAndUpdate.returns({
        exec: sinon.stub().resolves(updatedVehicleDoc),
      });

      const result = await repository.update('someid', vehicleData);

      expect(result).to.be.instanceOf(Vehicle);
      expect(result?.modelo).to.equal('Updated Model');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(
        vehicleModelStub.findOneAndUpdate.calledWith(
          { _id: 'someid', deleted_at: null },
          vehicleData,
          { new: true },
        ),
      ).to.be.true;
    });

    it('should return null if vehicle not found', async () => {
      vehicleModelStub.findOneAndUpdate.returns({
        exec: sinon.stub().resolves(null),
      });

      const result = await repository.update('nonexistentid', {});

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(result).to.be.null;
    });
  });

  describe('search', () => {
    it('should return a pagination of vehicles matching the criteria', async () => {
      const query: SearchCriteria<Vehicle> = {
        where: {
          placa: {
            $like: 'ABC',
          },
        } as any,
        order: { createdAt: 'asc' } as any,
        skip: 0,
        take: 10,
      };

      const selection: Array<keyof Vehicle> = ['placa', 'modelo'];

      const vehicleDocs = [
        {
          _id: 'id1',
          placa: 'ABC-1234',
          chassi: '9BWZZZ377VT004251',
          renavam: '12345678901',
          modelo: 'Gol',
          marca: 'Volkswagen',
          ano: 2022,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      const modifiedWhere = {
        placa: {
          $regex: new RegExp('ABC', 'i'),
        },
      };

      vehicleModelStub.find.returns({
        sort: sinon.stub().returnsThis(),
        skip: sinon.stub().returnsThis(),
        limit: sinon.stub().returnsThis(),
        select: sinon.stub().returnsThis(),
        exec: sinon.stub().resolves(vehicleDocs),
      });

      vehicleModelStub.countDocuments.resolves(1);

      const result = await repository.search(query, selection);

      expect(result.items).to.be.an('array');
      expect(result.items).to.have.length(1);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(vehicleModelStub.find.calledWith(modifiedWhere)).to.be.true;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(vehicleModelStub.countDocuments.calledWith(modifiedWhere)).to.be
        .true;
    });
  });
});
