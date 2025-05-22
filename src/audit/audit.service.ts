import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { survey_store_report } from "./entities/survey_store_report.entity";
import { CreateAuditAreaDto } from "./dto/create.auditArea.dto";
import { AuditAreas } from "./entities/AuditAreas.entity";
import { AuditQuestions } from "./entities/AuditQuestions.entity";
import { CreateAuditQuestionsDto } from "./dto/create.auditQuestions.dto";
import { SurveyQuery } from "./entities/SurveyQuery.entity";

@Injectable()
export class AuditService {

    constructor(
        @InjectRepository(survey_store_report)
        private surveyStoreReportRepository: Repository<survey_store_report>,
        @InjectRepository(AuditAreas)
        private auditAreaRepository: Repository<AuditAreas>,
        @InjectRepository(AuditQuestions)
        private auditQuestionsRepository: Repository<AuditQuestions>,
        @InjectRepository(SurveyQuery)
        private surveyQueryRepository: Repository<SurveyQuery>
    ) { }





    // Create Audit Areas 
    async createAuditArea(createAuditAreaDto: CreateAuditAreaDto): Promise<AuditAreas> {
        const auditArea = this.auditAreaRepository.create(createAuditAreaDto);
        return this.auditAreaRepository.save(auditArea);
    }

    async getAuditDataById(store_id: number, survey_id: number, user_id: number) {
        return this.surveyStoreReportRepository.findBy({ store_id: store_id, survey_id: survey_id, user_id: user_id });
    }


    // create Audit Questions
    async createAuditQuestions(createAuditQuestionsDto: CreateAuditQuestionsDto): Promise<AuditQuestions> {
        const auditQuestions = this.auditQuestionsRepository.create(createAuditQuestionsDto);
        return this.auditQuestionsRepository.save(auditQuestions);
    }


    // get audit area list survey id
    async getAuditAreaList(survey_id: number): Promise<AuditAreas[]> {
        return this.auditAreaRepository.find({ where: { survey_id: survey_id }, select: ['id', 'area_name'] });
    }

    // get all the servey Questions list with areas 
    async getAllSurveyQuestionsList(survey_id: number): Promise<SurveyQuery[]> {
        const listofSurveyQuestions = await this.surveyQueryRepository
            .createQueryBuilder('survey_query')
            .innerJoin('audit_areas', 'a', 'a.id = survey_query.area')
            .innerJoin('survey', 's', 's.id = survey_query.survey_id')
            .innerJoin('audit_questions', 'aq', 'aq.question_id = survey_query.audit_question_id')
            .where('survey_query.survey_id = :survey_id', { survey_id })
            .orderBy('survey_query.id', 'ASC')
            .select(['survey_query.id as survey_query_id', 'survey_query.survey_query as question', 'aq.option_types as option_types', 'survey_query.type as type', 'survey_query.mandatory as mandatory', 'survey_query.yes_image as yes_image', 'survey_query.no_image as no_image',
                'survey_query.no_image as no_image', 'a.area_name as area_name', 's.survey_name as survey_name'])
            .getRawMany<SurveyQuery>();
        

        if (listofSurveyQuestions.length === 0) {
            throw new NotFoundException('No questions found for this survey');
        }
        return listofSurveyQuestions;
    }


    async getAuditQuestionList(area_id: number): Promise<SurveyQuery[]> {
        const listOfQuestions = await this.surveyQueryRepository
        .createQueryBuilder('survey_query')
        .leftJoin('audit_areas', 'a', 'a.id = survey_query.area')
        .leftJoin('audit_questions', 'aq', 'aq.question_id = survey_query.audit_question_id')
        .where('survey_query.area = :area_id', { area_id })
        .select(['survey_query.id as survey_query_id', 'survey_query.survey_query as question', 'aq.option_types as option_types', 'survey_query.type as type', 'survey_query.mandatory as mandatory', 'survey_query.yes_image as yes_image', 'survey_query.no_image as no_image',
             'a.area_name as area_name'])
        .getRawMany<SurveyQuery>();
     
        if (listOfQuestions.length === 0) {
            throw new NotFoundException('No questions found for this area');
        }

        return listOfQuestions;
    }



}