export class CustomError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
  }
}

export class InvalidRequest extends CustomError {
    constructor(){
        super(400, "Incorrect data");
    }
};

