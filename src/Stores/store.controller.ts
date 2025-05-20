import { Get , Param , Post , Body, UseGuards } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { StoreService } from "./store.service";
import { Retailers } from "./entities/Retailers.entity";
// import { CreateStoreDto } from "./dto/create.store.dto";
import { CreateRetailerDto } from "./dto/create.store.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserSurvey } from "./entities/UserSurvey.entity";  
@Controller('stores')
export class StoreController {
    constructor(private readonly storeService: StoreService){}

    @Get()
    findAllStores(): Promise<Retailers[]>{
        return this.storeService.findAllStores();
    }

    // @Get('user/:userId')
    // findStoresByUserId(@Param('userId') userId: number): Promise<Retailers[]> {
    //     return this.storeService.findStoreByUserId(userId);
    // }


    @Get('user/:userId')
    findStoresByUserId(@Param('userId') userId: number): Promise<Retailers[]> {
        // console.log(userId);
        return this.storeService.findStoreByUserId(userId);
    }

    @Get('survey/:storeId')
    findSurveyByStoreId(@Param('storeId') storeId: number): Promise<UserSurvey[]> {
        return this.storeService.findSurveyByStoreId(storeId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/createStore')
    createStore(@Body() createRetailerDto: CreateRetailerDto) {
        // console.log(createRetailerDto);
        return this.storeService.createStore(createRetailerDto);
    }
}
