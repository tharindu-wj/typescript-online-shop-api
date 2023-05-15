export class ErrorResponse extends Error {
  private statusCode: string;

  constructor(message: string, statusCode: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
