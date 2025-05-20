import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { SurveyService } from "./survey.service";   
import { CreateSurveyDto } from "./dto/create.survey.dto";


@Controller('survey')
export class SurveyController {

    constructor(private readonly surveyService: SurveyService) {}


    @Post('/createSurvey')
    createSurvey(@Body() createSurveyDto: CreateSurveyDto){
        // console.log(createSurveyDto);
        return this.surveyService.createSurvey(createSurveyDto);
    }   


    @Get('/surveyDetails/:id')
    getSurveyDetails(@Param('id') id: number){
        return this.surveyService.getSurveyDetails(id);
    }


}
