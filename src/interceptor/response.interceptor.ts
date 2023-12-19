import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import * as URI from 'url';
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const { query, url } = ctx.getRequest();
    const parsedUrl = URI.parse(url);
    const pathname = `${parsedUrl.pathname}`;
    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'object') {
          if (data?.total) {
            const limit = Number(query.limit) || 10;
            const page = Number(query.page) || 1;
            return {
              status: 'Success',
              data: data.results,
              meta: {
                page_size: limit,
                total_page: data.total,
                current_page: page,
                next_page: `${pathname}?limit=${limit}&page=${page + 1}`,
                prev_page: `${pathname}?limit=${limit}&page=${page - 1}`,
              },
            };
          }
          return {
            status: 'Success',
            data,
          };
        }

        return {
          status: 'Success',
          message: data || 'OK',
        };
      }),
    );
  }
}
