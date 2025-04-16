import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../enum/user.role.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(UserRole)
  role?: UserRole = UserRole.USER;
}

