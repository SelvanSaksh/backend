import { IsString, IsNotEmpty, IsNumber } from "class-validator";



export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    role_name: string;


    @IsString()
    @IsNotEmpty()
    description: string;


    // @IsNumber()
    // @IsNotEmpty()
    // comp_id: number;


}

    
