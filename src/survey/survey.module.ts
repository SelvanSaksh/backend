import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SurveyController } from "./survey.controller";
import { SurveyService } from "./survey.service";
import { Survey } from "./entities/Survey.entity";
import { SurveyQuery } from "./entities/SurveyQuery.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Survey, SurveyQuery])],
    controllers: [SurveyController],
    providers: [SurveyService],
})
export class SurveyModule {}
    
