import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSurveyDto {

    @IsNumber()
    @IsNotEmpty()
    comp_id: number;


    @IsString()
    @IsNotEmpty()
    survey_name: string;

    @IsString()
    @IsNotEmpty()
    description: string;    

    @IsNumber()
    type?: number;

    // @IsNumber()
    // parent_survey_id?: number;   

    // @IsString()
    // frequency?: string;

    // @IsNumber()
    // day?: number;        

    @IsString()
    status?: string;
    

}

