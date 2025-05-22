import { CreateUserTrackingDto } from "./dto/create.userTracking.dto";
import { UserTrackingService } from "./userTracking.service";
import { Controller, Post, Body, Get, Query } from "@nestjs/common";

@Controller('user-tracking')
export class UserTrackingController {
    constructor(private readonly userTrackingService: UserTrackingService) {

    }   

    @Post('dayStart')
    createUserTracking(@Body() createUserTrackingDto: CreateUserTrackingDto) {
        return this.userTrackingService.createSalesManTracking(createUserTrackingDto);
    }

    @Post('dayEnd')
    createUserTrackingDayEnd(@Body() createUserTrackingDto: CreateUserTrackingDto) {
        return this.userTrackingService.createSalesManTrackingDayEnd(createUserTrackingDto);
    }

    @Post('checkIn')
    createUserTrackingCheckIn(@Body() createUserTrackingDto: CreateUserTrackingDto) {
        return this.userTrackingService.createSalesManTrackingCheckIn(createUserTrackingDto);
    }

    @Get('checkInDetails')
    getAllcheckInDetails(@Query('user_id') user_id: string) {
        return this.userTrackingService.getAllcheckInDetails(user_id);
    }

}



