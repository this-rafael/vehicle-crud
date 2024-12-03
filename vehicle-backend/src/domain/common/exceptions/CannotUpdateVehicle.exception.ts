import { ApplicationException } from './Application.exception';

export class CannotUpdateVehicleException extends ApplicationException {
  constructor(baseParams: string) {
    super(
      `Cannot update vehicle with ${baseParams} because they not exists or are be deleted`,
      400,
    );
  }
}
