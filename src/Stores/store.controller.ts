import { Get, Param, Post, Body, UseGuards, UseInterceptors, UploadedFile } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { StoreService } from "./store.service";
import { Retailers } from "./entities/Retailers.entity";
// import { CreateStoreDto } from "./dto/create.store.dto";
import { CreateRetailerDto } from "./dto/create.store.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserSurvey } from "./entities/UserSurvey.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
@Controller('stores')
export class StoreController {
    constructor(private readonly storeService: StoreService) { }

    @Get()
    findAllStores(): Promise<Retailers[]> {
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
        // return this.storeService.createStore(createRetailerDto);
    }

    @Post('csv')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.originalname.endsWith('.csv')) {
                    return callback(new Error('Only CSV files are allowed!'), false);
                }
                callback(null, true);
            },
        }),
    )
    async uploadCSV(@UploadedFile() file: Express.Multer.File) {
        return this.storeService.processCSV(file.path);
    }

}
