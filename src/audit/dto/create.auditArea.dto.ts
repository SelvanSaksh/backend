import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAuditAreaDto {

    @IsNotEmpty()
    @IsNumber()
    store_id: number;

    @IsNotEmpty()
    @IsNumber()
    survey_id: number;

    @IsNotEmpty()
    @IsString()
    area_name: string;

    @IsOptional()  
    @IsString()
    area_details: string;

    @IsOptional()
    @IsNumber()
    parent_area_id: number;
}   
