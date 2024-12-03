import { ApplicationException } from './Application.exception';

export class CannotDeleteVehicleException extends ApplicationException {
  constructor(id: string) {
    super(`Vehicle with id ${id} cannot be deleted`, 422);
  }
}
