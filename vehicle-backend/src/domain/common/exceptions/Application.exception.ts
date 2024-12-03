export abstract class ApplicationException extends Error implements Error {
  public statusCode: number;
  protected constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
