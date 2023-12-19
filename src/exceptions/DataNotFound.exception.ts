import { HttpException, HttpStatus } from '@nestjs/common';

export default class DataNotFound extends HttpException {
  msg: string;

  constructor(message = 'Data Not Found', status = HttpStatus.NOT_FOUND) {
    super(message, status);

    this.msg = message;
  }
}
