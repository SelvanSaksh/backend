import { CreateUserTrackingDto } from "./dto/create.userTracking.dto";
import { UserTrackingService } from "./userTracking.service";
import { Controller, Post, Body, Get, Query, Param } from "@nestjs/common";
import { GeoServices } from "./geoservices/goeservices.service";

@Controller('user-tracking')
export class UserTrackingController {
    constructor(
        private readonly userTrackingService: UserTrackingService,
        private readonly geoServices:GeoServices
    ) {

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
    getAllcheckInDetails(@Query('user_id') user_id: string, @Query('date') date: string) {
    return this.userTrackingService.getAllcheckInDetails(user_id, date);
    }


    @Get('/trackingStatusById/:userId')
    async getTrackingStatusById(@Param('userId') userId:number)
    {
        return this.userTrackingService.getTrackingStatusById(userId)

    }
    

    @Get('latlongAddress')
    getAddress( @Query('lat') lat:number , @Query('long') long:number)
    {
        console.log(lat ,long)
        return this.geoServices.getLoaction(lat, long)
    }

}



