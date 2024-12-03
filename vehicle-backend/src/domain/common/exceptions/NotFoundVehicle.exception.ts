import { ApplicationException } from './Application.exception';

export class NotFoundVehicleException extends ApplicationException {
  constructor(id: string) {
    super(`Vehicle with id ${id} not found`, 404);
  }
}
