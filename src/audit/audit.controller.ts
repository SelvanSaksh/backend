import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
  Delete,
  Query,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditQuestionsDto } from './dto/create.auditQuestions.dto';
import { CreateAuditAreaDto } from './dto/create.auditArea.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('audit')
export class AuditController {
  surveyResponseService: any;

  constructor(private readonly auditService: AuditService) {}

  // Audit Report by store id, survey id and user id
  @Post('auditReport')
  getAuditData(@Body() body: any) {
    console.log(body);
    return this.auditService.getAuditDataById(
      body.store_id,
      body.survey_id,
      body.user_id,
    );
  }

  // Create Audit Areas
  @Post('createAuditArea')
  createAuditArea(@Body() createAuditAreaDto: CreateAuditAreaDto) {
    return this.auditService.createAuditArea(createAuditAreaDto);
  }

  // Create Audit Questions
  @Post('createAuditQuestions')
  createAuditQuestions(
    @Body() createAuditQuestionsDto: CreateAuditQuestionsDto,
  ) {
    return this.auditService.createAuditQuestions(createAuditQuestionsDto);
  }

  // Get Audit Area List by survey id
  @Get('getAuditAreaList/:survey_id')
  getAuditAreaList(@Param('survey_id') survey_id: number) {
    return this.auditService.getAuditAreaList(survey_id);
  }

  // Get Audit Question List by area id
  @Get('getAuditQuestionList/:area_id')
  getAuditQuestionList(@Param('area_id') area_id: number) {
    return this.auditService.getAuditQuestionList(area_id);
  }

  // Get All Survey Questions List with areas and surveys
  @Get('getAllSurveyQuestionsList/:survey_id/:store_id/:userId/:dateStr')
  getAllSurveyQuestionsList(
    @Param('survey_id') survey_id: number,
    @Param('store_id') store_id: number,
    @Param('userId') userId: number,
    @Param('dateStr') dateStr: number,
  ) {
    return this.auditService.getAllSurveyQuestionsList(
      survey_id,
      store_id,
      userId,
      dateStr,
    );
  }

  @Get('getAllSurveyList/:userId')
  getAllSurveyList(@Param('userId') userId: number) {
    return this.auditService.getAllSurveyList(userId);
  }

  @Delete('/deleteSurvey/:surveyId/:storeId/:userId/:dateStr')
  async deleteSurvey(
    @Param('surveyId') surveyId: number,
    @Param('storeId') storeId: number,
    @Param('userId') userId: number,
    @Param('dateStr') dateStr: string,
  ) {
    await this.auditService.deleteSurveyByDetails(
      storeId,
      surveyId,
      userId,
      dateStr,
    );
    return { message: 'Survey deleted successfully' };
  }

  // upload multiple file to bucket and get the like (https)

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await this.auditService.uploadMultiple(files);
    return { success: true, urls };
  }

  @Post('answer')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSurveyResponseDto: any) {
    const surveyResponse = await this.auditService.createSurveyResponse(
      createSurveyResponseDto,
    );
    return {
      message: 'Survey response created successfully',
      data: surveyResponse,
    };
  }

  @Get('markCompleted/:surveyResponseId')
  @HttpCode(HttpStatus.OK)
  async updateMArkSubmit(@Param('surveyResponseId') surveyResponseId: number) {
    return this.auditService.markCompleted(surveyResponseId);
  }
}
