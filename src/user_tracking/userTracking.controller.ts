import { CreateUserTrackingDto } from "./dto/create.userTracking.dto";
import { UserTrackingService } from "./userTracking.service";
import { Controller, Post, Body } from "@nestjs/common";

@Controller('user-tracking')
export class UserTrackingController {
    constructor(private readonly userTrackingService: UserTrackingService) {

    }   

    @Post('dayStart')
    createUserTracking(@Body() createUserTrackingDto: CreateUserTrackingDto) {
        return this.userTrackingService.createSalesManTracking(createUserTrackingDto);
    }
}



