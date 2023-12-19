import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { UniqueViolationError } from 'objection';

@Catch()
export class HandlerFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapter;
    const ctx = host.switchToHttp();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const resBody = {
      status: 'Error',
      message: exception.msg || 'Internal Server Error',
    };

    if (exception.type) {
      resBody['type'] = exception.type;
    }

    if (exception instanceof UniqueViolationError) {
      httpStatus = 409;
      resBody.message = `${exception.columns} Has Already Exists`;
    }

    if (exception instanceof BadRequestException) {
      const { message, statusCode }: any = exception.getResponse();
      resBody.message = message;
      resBody.status = statusCode;
    }
    console.error(exception);
    httpAdapter.reply(ctx.getResponse(), resBody, httpStatus);
  }
}
