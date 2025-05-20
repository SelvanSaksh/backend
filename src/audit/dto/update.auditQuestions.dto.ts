import { PartialType } from "@nestjs/mapped-types";
import { CreateAuditQuestionsDto } from "./create.auditQuestions.dto";


export class UpdateAuditQuestionsDto extends PartialType(CreateAuditQuestionsDto){}