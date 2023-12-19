import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import Authorization from '../exceptions/authorization.exception';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.headers.authorization) {
      throw new Authorization();
    }

    const token = req.headers.authorization.split(' ')[1];

    const jwtService = new JwtService();

    try {
      if (!token) {
        throw new Authorization();
      }
      const verify = await jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      req['user'] = verify;
      return true;
    } catch (error) {
      throw new Authorization();
    }
  }
}
