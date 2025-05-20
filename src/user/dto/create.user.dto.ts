import { IsEmail, IsString, MinLength, IsEnum, IsNumber } from 'class-validator';
// import { UserRole } from '../enum/user.role.enum';

export class CreateUserDto {

  @IsString()
  name: string;
  
  @IsString()
  @MinLength(4)
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  pass: string;

  @IsNumber()
  user_role: number;
}

