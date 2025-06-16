import { IsEmail, IsString, MinLength, IsEnum, IsNumber, IsOptional } from 'class-validator';
// import { UserRole } from '../enum/user.role.enum';

export class CreateUserDto {

  @IsString()
  name: string;
  
  @IsString()
  @IsOptional()
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  pass: string;

  @IsOptional()
   @IsString()
  mob_num:string;


  @IsNumber()
  user_role: number;
}

