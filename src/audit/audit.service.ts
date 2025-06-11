import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { survey_store_report } from '../survey/entities/survey_store_report.entity';
import { CreateAuditAreaDto } from './dto/create.auditArea.dto';
import { AuditAreas } from './entities/AuditAreas.entity';
import { AuditQuestions } from './entities/AuditQuestions.entity';
import { CreateAuditQuestionsDto } from './dto/create.auditQuestions.dto';
import { SurveyQuery } from './entities/SurveyQuery.entity';
import { Answer, SurveyResponse } from './entities/SubmitAudit.entity';
import { CloudflareR2Service } from './cloudflare-r2.service.ts/cloudflare-r2.service.ts.service';
import { endOfDay, startOfDay } from 'date-fns';
import { log } from 'console';
// import { CloudflareR2Service } from './cloudflare-r2.service';
// import { Answer, SurveyResponse } from '../survey-response/SurveyResponse.entity';
// import { CreateSurveyResponseDto } from '../survey-response/survey-response.dto';

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
    private surveyQueryRepository: Repository<SurveyQuery>,
    @InjectRepository(SurveyResponse)
    private surveyResponseRepository: Repository<SurveyResponse>,
    private readonly cloudflareR2Service: CloudflareR2Service,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async createAuditArea(
    createAuditAreaDto: CreateAuditAreaDto,
  ): Promise<AuditAreas> {
    const auditArea = this.auditAreaRepository.create(createAuditAreaDto);
    return this.auditAreaRepository.save(auditArea);
  }

  async getAuditDataById(store_id: number, survey_id: number, user_id: number) {
    return this.surveyStoreReportRepository.findBy({
      store_id,
      survey_id,
      user_id,
    });
  }

  async createAuditQuestions(
    createAuditQuestionsDto: CreateAuditQuestionsDto,
  ): Promise<AuditQuestions> {
    const auditQuestions = this.auditQuestionsRepository.create(
      createAuditQuestionsDto,
    );
    return this.auditQuestionsRepository.save(auditQuestions);
  }

  async getAuditAreaList(survey_id: number): Promise<AuditAreas[]> {
    return this.auditAreaRepository.find({
      where: { survey_id },
      select: ['id', 'area_name'],
    });
  }

  async getAllSurveyQuestionsList(
    survey_id: number,
    store_id: number,
    userId: number,
    dateStr: any,
  ): Promise<any[]> {
    console.log('survey_id,store_id,userId,dateStr',survey_id,store_id,userId,dateStr);
    
    const listofSurveyQuestions = await this.surveyQueryRepository
      .createQueryBuilder('survey_query')
      .innerJoin('audit_areas', 'a', 'a.id = survey_query.area')
      .innerJoin('survey', 's', 's.id = survey_query.survey_id')
      .innerJoin(
        'audit_questions',
        'aq',
        'aq.question_id = survey_query.audit_question_id',
      )
      .leftJoin(
        'survey_responses',
        'sr',
        `sr.surveyId = s.id AND DATE(sr.createdAt) = :dateStr AND sr.userID = :userId AND sr.storeId =:store_id`,
        { userId, store_id, dateStr },
      )
      .leftJoin(
        'answers',
        'ans',
        'ans.surveyResponseId = sr.id AND ans.questionID = survey_query.id',
      )
      .where('survey_query.survey_id = :survey_id', { survey_id })
      .orderBy('survey_query.id', 'ASC')
      .select([
        'survey_query.id as survey_query_id',
        'survey_query.survey_query as question',
        'aq.option_types as option_types',
        'survey_query.type as type',
        'survey_query.mandatory as mandatory',
        'survey_query.yes_image as yes_image',
        'survey_query.no_image as no_image',
        'survey_query.area as area_id',
        'a.area_name as area_name',
        's.survey_name as survey_name',
        'sr.id as survey_response_id',
        'sr.storeId as store_id',
        'sr.userID as user_id',
        'sr.createdAt as submitted_at',
        'ans.questionID as qId',
        'ans.choosenValue as choosenValue',
        'ans.noteText as noteText',
        'ans.imagePaths as imagePaths',
        'ans.completed as completed',
        'sr.completed as submitted',
      ])
      .getRawMany();

    if (listofSurveyQuestions.length === 0) {
      throw new NotFoundException(
        'No questions found for this survey or no submission today',
      );
    }
    let responses: any;
    if (listofSurveyQuestions.length > 0) {
      responses = {
        data: listofSurveyQuestions,
        completed: listofSurveyQuestions[0].submitted,
      };
    } else {
      responses = { data: listofSurveyQuestions, completed: 0 };
    }

    return responses;
  }

  async getAllSurveyList(userId: number): Promise<{
    completed: any[];
    incompleted: any[];
  }> {
    const rawList = await this.surveyResponseRepository
      .createQueryBuilder('survey_responses')
      .innerJoin('survey', 's', 's.id = survey_responses.surveyId')
      .innerJoin('retailers', 'r', 'survey_responses.storeId = r.id')
      .leftJoin('answers', 'ans', 'ans.surveyResponseId = survey_responses.id')
      .leftJoin('survey_query', 'sq', 'sq.survey_id = s.id')
      .where('survey_responses.userID = :userId', { userId })
      .select([
        'survey_responses.id as id',
        'r.retailer as storeName',
        'r.id as storeId',
        's.id as surveyId',
        's.survey_name as surveyName',
        'survey_responses.completed as completed',
        "DATE_FORMAT(survey_responses.createdAt, '%d/%m/%Y') as dateStr",
        'ROUND((COUNT(ans.completed) / COUNT(DISTINCT sq.id))/COUNT(DISTINCT sq.id)*100) as score',
      ])
      .groupBy('survey_responses.id')
      .addGroupBy('r.retailer')
      .addGroupBy('r.id')
      .addGroupBy('s.id')
      .addGroupBy('s.survey_name')
      .addGroupBy('survey_responses.completed')
      .addGroupBy('survey_responses.createdAt')
      .getRawMany();

    // Now partition into completed vs. incompleted
    const grouped = rawList.reduce(
      (acc, entry) => {
        if (entry.completed === 1) {
          acc.completed.push(entry);
        } else {
          acc.incompleted.push(entry);
        }
        return acc;
      },
      { completed: [] as any[], incompleted: [] as any[] },
    );

    return grouped;
  }

  async deleteSurveyByDetails(
  storeId: number,
  surveyId: number,
  userId: number,
  dateStr: string
): Promise<void> {
 console.log('dateStr',dateStr);
 
    const isoDateStart = new Date(`${dateStr}T00:00:00.000Z`);
    const isoDateEnd = new Date(`${dateStr}T23:59:59.999Z`);


  console.log('iuygfghj', storeId, surveyId,  userId, isoDateStart, isoDateEnd,
    )

  const surveyResponse = await this.surveyResponseRepository.findOne({
    where: {
      storeId,
      surveyId,
      userID: userId,
      createdAt: Between(isoDateStart, isoDateEnd),
    },
  });

  console.log('surveyResponse',surveyResponse);
  
  if (!surveyResponse) {
    throw new NotFoundException('Survey not found for given details');
  }

  await this.surveyResponseRepository.delete(surveyResponse.id);
}


  async getAuditQuestionList(area_id: number): Promise<SurveyQuery[]> {
    const listOfQuestions = await this.surveyQueryRepository
      .createQueryBuilder('survey_query')
      .leftJoin('audit_areas', 'a', 'a.id = survey_query.area')
      .leftJoin(
        'audit_questions',
        'aq',
        'aq.question_id = survey_query.audit_question_id',
      )
      .where('survey_query.area = :area_id', { area_id })
      .select([
        'survey_query.id as survey_query_id',
        'survey_query.survey_query as question',
        'aq.option_types as option_types',
        'survey_query.type as type',
        'survey_query.mandatory as mandatory',
        'survey_query.yes_image as yes_image',
        'survey_query.no_image as no_image',
        'a.area_name as area_name',
      ])
      .getRawMany();

    if (listOfQuestions.length === 0) {
      throw new NotFoundException('No questions found for this area');
    }

    return listOfQuestions;
  }

  async uploadMultiple(files: Express.Multer.File[]) {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const key = `${Date.now()}-${file.originalname}`;
      const url = await this.cloudflareR2Service.uploadFile(
        file.buffer,
        key,
        file.mimetype,
      );
      uploadedUrls.push(url);
    }
    return uploadedUrls;
  }

  async createSurveyResponse(dto: any): Promise<SurveyResponse> {
    const { storeId, surveyId, userID, answeredData } = dto;

    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    let surveyResponse = await this.surveyResponseRepository.findOne({
      where: {
        storeId,
        surveyId,
        userID,
        createdAt: Between(todayStart, todayEnd),
      },
      relations: ['answers'],
    });

    const newAnswers = answeredData.map((answerDto) => {
      const answer = new Answer();
      answer.questionID = answerDto.questionID;
      answer.choosenValue =
        answerDto.choosenValue ?? answerDto.choosenvalue ?? '';
      answer.areaId = answerDto.areaId;
      answer.imagePaths = answerDto.imagePaths || [];
      answer.noteText = answerDto.noteText;
      return answer;
    });

    if (surveyResponse) {
      await this.answerRepository.remove(surveyResponse.answers);
      surveyResponse.answers = newAnswers;
    } else {
      surveyResponse = this.surveyResponseRepository.create({
        storeId,
        surveyId,
        userID,
        answers: newAnswers,
      });
    }

    return this.surveyResponseRepository.save(surveyResponse);
  }

  async markCompleted(surveyResponseId: number): Promise<any> {
    const findExistingResponse = await this.surveyResponseRepository.findOne({
      where: { id: surveyResponseId },
    });

    if (!findExistingResponse) {
      throw new NotFoundException('Response not found');
    }

    findExistingResponse.completed = true;
    await this.surveyResponseRepository.save(findExistingResponse);

    return { message: 'Submitted successfully' };
  }
}
