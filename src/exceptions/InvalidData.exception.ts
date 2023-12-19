import { HttpException, HttpStatus } from '@nestjs/common';

export default class InvalidData extends HttpException {
  msg: string;

  constructor(message = 'Invalid Data', status = HttpStatus.BAD_REQUEST) {
    super(message, status);

    this.msg = message;
  }
}
