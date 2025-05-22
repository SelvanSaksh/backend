import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SalesManTracking } from "./entities/SalesManTracking.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserTrackingDto } from "./dto/create.userTracking.dto";
import { UserTrackingEnum } from "./enum/user.tracking.enum";
@Injectable()
export class UserTrackingService { 
    constructor(@InjectRepository(SalesManTracking) private salesManTrackingRepository: Repository<SalesManTracking>) {}



    // for day start
    async createSalesManTracking(createUserTrackingDto: CreateUserTrackingDto){
        console.log(createUserTrackingDto.user_id)
        console.log(UserTrackingEnum.DAY_START)

        const existingDayStart = await this.salesManTrackingRepository.findOne({
            where: {
                user_id: createUserTrackingDto.user_id,
                user_tracking_type: UserTrackingEnum.DAY_START,
                
            },
        });
        

        // const newDayStart = this.salesManTrackingRepository.create({
        //     ...createUserTrackingDto,
        //     user_tracking_type: UserTrackingEnum.DAY_START,
        // });
        // return this.salesManTrackingRepository.save(newDayStart);
    }   

    // for day end
    async createSalesManTrackingDayEnd(createUserTrackingDto: CreateUserTrackingDto): Promise<SalesManTracking> {
        const newDayEnd = this.salesManTrackingRepository.create({
            ...createUserTrackingDto,
            user_tracking_type: UserTrackingEnum.DAY_END,
        });
        return this.salesManTrackingRepository.save(newDayEnd);
    }   

    // For CheckIn
    async createSalesManTrackingCheckIn(createUserTrackingDto: CreateUserTrackingDto): Promise<SalesManTracking> {
        const newCheckIn = this.salesManTrackingRepository.create({
            ...createUserTrackingDto,
            user_tracking_type: UserTrackingEnum.CHECK_IN,
        });
        return this.salesManTrackingRepository.save(newCheckIn);
    }   
}

        