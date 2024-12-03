import { ApplicationException } from './Application.exception';

export class CannotCreateVehicleException extends ApplicationException {
  constructor(baseParams: string, originalErrorMessage: string) {
    super(
      `Cannot create vehicle with ${baseParams} because ${originalErrorMessage}`,
      400,
    );
  }
}
