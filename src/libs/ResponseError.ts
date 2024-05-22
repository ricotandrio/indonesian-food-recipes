export class ResponseError extends Error {
  code: number;
  
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }

  toJson() {
    return {
      code: this.code,
      message: this.message,
    };
  }

  static fromError(error: Error) {
    return new ResponseError(500, error.message);
  }
}