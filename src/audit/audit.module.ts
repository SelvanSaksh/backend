import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { survey_store_report } from "../survey/entities/survey_store_report.entity";
import { AuditController } from "./audit.controller";
import { AuditService } from "./audit.service";     
import { AuditAreas } from "./entities/AuditAreas.entity";
import { AuditQuestions } from "./entities/AuditQuestions.entity";
import { SurveyQuery } from "./entities/SurveyQuery.entity";

@Module({
    imports:[TypeOrmModule.forFeature([survey_store_report, AuditAreas, AuditQuestions , SurveyQuery])],
    controllers:[AuditController],
    providers:[AuditService],
    exports:[AuditService]
})
export class AuditModule{}