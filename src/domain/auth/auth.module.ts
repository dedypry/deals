import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ObjectionModule } from 'nestjs-objection/dist';
import { UserModel } from '../../models/User.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ObjectionModule.forFeature([UserModel]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '336d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
