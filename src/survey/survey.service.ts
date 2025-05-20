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
  
        // Get survey queries with audit area and audit question  
        
        const surveyQuery = await this.surveyQueryRepository
        .createQueryBuilder('surveyQuery')
        .leftJoin('surveyQuery.auditArea', 'auditArea')
        .leftJoin('surveyQuery.auditQuestion', 'auditQuestion')
        .leftJoin('surveyQuery.survey', 'survey')
        .select([
          // Main table fields
          'surveyQuery.id',
          'surveyQuery.survey_id',
          'surveyQuery.survey_query',
        
      
          // auditArea fields
          'auditArea.id',
          'auditArea.area_name',
      
          // auditQuestion fields
          'auditQuestion.question_id',
      
          // survey fields
          'survey.id',
          'survey.survey_name',
          'survey.status',
        ])
        .where('surveyQuery.survey_id = :id', { id })
        .andWhere('survey.status = :status', { status: 'Active' })
        .getMany();
      
        
        // const surveyQuery = await this.surveyQueryRepository.find({ where: { survey_id: id, survey: { status: 'Active' } }, relations: ['auditArea', 'auditQuestion', 'survey'] });
        if (!surveyQuery) {
            throw new NotFoundException('Survey queries not found');
        }

       

        return surveyQuery;
    }

    // async updateSurvey(id: number, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    //     await this.surveyRepository.update(id, updateSurveyDto);
    // }   
}


