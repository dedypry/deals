import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class QueryInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { query } = request;

    query.page = query.page ? query.page - 1 : 0;
    if (!query.limit) {
      query.limit = 10;
    }
    return next.handle();
  }
}
