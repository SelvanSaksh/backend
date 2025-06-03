import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { AuditService } from "./audit.service";
import { CreateAuditQuestionsDto } from "./dto/create.auditQuestions.dto";
import { CreateAuditAreaDto } from "./dto/create.auditArea.dto";
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('audit')
export class AuditController {

    constructor(private readonly auditService: AuditService) { }


    // Audit Report by store id, survey id and user id
    @Post('auditReport')
    getAuditData(@Body() body: any) {
        console.log(body);
        return this.auditService.getAuditDataById(body.store_id, body.survey_id, body.user_id);

    }


    // Create Audit Areas
    @Post('createAuditArea')
    createAuditArea(@Body() createAuditAreaDto: CreateAuditAreaDto) {
        return this.auditService.createAuditArea(createAuditAreaDto);
    }


    // Create Audit Questions
    @Post('createAuditQuestions')
    createAuditQuestions(@Body() createAuditQuestionsDto: CreateAuditQuestionsDto) {
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
    @Get('getAllSurveyQuestionsList/:survey_id')
    getAllSurveyQuestionsList(@Param('survey_id') survey_id: number) {
        return this.auditService.getAllSurveyQuestionsList(survey_id);
    }

    // upload multiple file to bucket and get the like (https)

    @Post('upload')
    @UseInterceptors(FilesInterceptor('images'))
    async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
        const urls = await this.auditService.uploadMultiple(files);
        return { success: true, urls };
    }

}