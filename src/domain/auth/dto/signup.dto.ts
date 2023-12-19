import { IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  age: string;

  @IsNotEmpty()
  @IsIn(['MALE', 'FEMALE'])
  gender: string;

  @IsString()
  bio: string;

  @IsString()
  location: string;

  @IsString()
  profile_picture_url: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  is_premium: boolean;
}
