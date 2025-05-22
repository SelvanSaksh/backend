import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Survey } from "./entities/Survey.entity";
import { CreateSurveyDto } from "./dto/create.survey.dto";
import { SurveyQuery } from "./entities/SurveyQuery.entity";


@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(Survey)
        private surveyRepository: Repository<Survey>,

        @InjectRepository(SurveyQuery)
        private surveyQueryRepository: Repository<SurveyQuery>
    ) { }


    async createSurvey(createSurveyDto: CreateSurveyDto): Promise<Survey> {
        const survey = this.surveyRepository.create(createSurveyDto);
        return this.surveyRepository.save(survey);
    }

    async getSurveyById(id: number): Promise<Survey> {
        const survey = await this.surveyRepository.findOne({ where: { id } });
        if (!survey) {
            throw new NotFoundException('Survey not found');
        }
        return survey;
    }


    // Get survey details 
    async getSurveyDetails(id: number): Promise<SurveyQuery[]> {
        const surveyQuery = await this.surveyQueryRepository
            .createQueryBuilder('surveyQuery')
            .leftJoin('surveyQuery.auditArea', 'auditArea')
            .leftJoin('surveyQuery.auditQuestion', 'auditQuestion')
            .leftJoin('surveyQuery.survey', 'survey')
            .select([
                'surveyQuery.id',
                'surveyQuery.survey_id',
                'surveyQuery.survey_query',
                'auditArea.id',
                'auditArea.area_name',
                'auditQuestion.question_id',
                'survey.id',
                'survey.survey_name',
                'survey.status',
            ])
            .where('surveyQuery.survey_id = :id', { id })
            .andWhere('survey.status = :status', { status: 'Active' })
            .getMany();

        if (!surveyQuery) {
            throw new NotFoundException('Survey queries not found');
        }
        return surveyQuery;
    }

    // async updateSurvey(id: number, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    //     await this.surveyRepository.update(id, updateSurveyDto);
    // }   
}


