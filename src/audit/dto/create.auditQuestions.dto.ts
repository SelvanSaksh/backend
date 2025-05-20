import { IsNumber, IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";


export class CreateAuditQuestionsDto {

    @IsString()
    @IsNotEmpty()
    question: string;

    @IsString()
    option_types: string;

    @IsNumber()
    @IsNotEmpty()
    sequence: number;

    @IsNumber()
    @IsNotEmpty()
    audit_area: number;
}