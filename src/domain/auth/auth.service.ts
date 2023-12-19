import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from 'nestjs-objection/dist';
import { UserModel } from '../../models/User.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { SigninDto } from './dto/signin.dto';
import DataNotFound from '../../exceptions/DataNotFound.exception';
import InvalidData from '../../exceptions/InvalidData.exception';

@Injectable()
export class AuthService {
  salt: string = process.env.BCRYPT_SALT;
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly jwtService: JwtService,
  ) {}

  async signin(body: SigninDto) {
    const user = await this.userModel.query().findOne({
      email: body.email,
    });

    if (!user) {
      throw new DataNotFound();
    }

    const isValidPassword = await bcrypt.compareSync(
      body.password,
      user.password,
    );

    delete user.password;

    if (!isValidPassword) {
      throw new InvalidData('Password not match');
    }

    return {
      user,
      token: await this.jwtService.signAsync({ ...user }),
    };
  }

  async signUp(body: SignupDto) {
    const user = await this.userModel.query().insert({
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, this.salt),
      gender: body.gender,
      bio: body.bio,
      location: body.location,
      is_premium: body.is_premium,
    });

    delete user.password;
    return {
      user,
      token: await this.jwtService.signAsync({ ...user }),
    };
  }
}
