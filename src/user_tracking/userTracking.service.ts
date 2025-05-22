import { Between, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SalesManTracking } from "./entities/SalesManTracking.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserTrackingDto } from "./dto/create.userTracking.dto";
import { UserTrackingEnum } from "./enum/user.tracking.enum";
import * as dayjs from "dayjs";
@Injectable()
export class UserTrackingService {
    constructor(@InjectRepository(SalesManTracking) private salesManTrackingRepository: Repository<SalesManTracking>) { }

    startOfDay = dayjs().startOf('day').toDate();
    endOfDay = dayjs().endOf('day').toDate();



    // for day start
    async createSalesManTracking(createUserTrackingDto: CreateUserTrackingDto): Promise<SalesManTracking> {

        const existingDayStart = await this.salesManTrackingRepository.findOne({
            where: {
                user_id: createUserTrackingDto.user_id,
                user_tracking_type: UserTrackingEnum.DAY_START,
                date_time: Between(this.startOfDay, this.endOfDay)
            },
        });
        if (existingDayStart) {
            throw new NotFoundException("Day start already exists");
        }

        const newDayStart = this.salesManTrackingRepository.create({
            ...createUserTrackingDto,
            user_tracking_type: UserTrackingEnum.DAY_START,
        });
        return this.salesManTrackingRepository.save(newDayStart);
    }

    // for day end
    async createSalesManTrackingDayEnd(createUserTrackingDto: CreateUserTrackingDto): Promise<SalesManTracking> {


        const existingDayEnd = await this.salesManTrackingRepository.findOne({
            where: {
                user_id: createUserTrackingDto.user_id,
                user_tracking_type: UserTrackingEnum.DAY_END,
                date_time: Between(this.startOfDay, this.endOfDay)
            },
        });

        if (existingDayEnd) {
            throw new NotFoundException("Day end already exists");
        }
        const newDayEnd = this.salesManTrackingRepository.create({
            ...createUserTrackingDto,
            user_tracking_type: UserTrackingEnum.DAY_END,
        });
        return this.salesManTrackingRepository.save(newDayEnd);
    }

    // For CheckIn
    async createSalesManTrackingCheckIn(createUserTrackingDto: CreateUserTrackingDto): Promise<SalesManTracking> {

        const { user_id } = createUserTrackingDto;

        const checkEndDay = await this.salesManTrackingRepository.findOne({
            where: {
                user_id: user_id,
                user_tracking_type: UserTrackingEnum.DAY_END,
                date_time: Between(this.startOfDay, this.endOfDay)
            },
        });
        if (checkEndDay) {
            throw new NotFoundException("Day has been ended");
        }
        const newCheckIn = this.salesManTrackingRepository.create({
            ...createUserTrackingDto,
            user_tracking_type: UserTrackingEnum.CHECK_IN,
        });
        return this.salesManTrackingRepository.save(newCheckIn);
    }



    async getAllcheckInDetails(user_id: string): Promise<SalesManTracking[]> {
        return this.salesManTrackingRepository
            .createQueryBuilder('sales_man_tracking')
            .leftJoin('admin_user', 'au', 'au.id = sales_man_tracking.user_id')
            .where('sales_man_tracking.user_id = :user_id', { user_id })
            .andWhere('sales_man_tracking.user_tracking_type = :user_tracking_type', { user_tracking_type: UserTrackingEnum.CHECK_IN })
            .select(['sales_man_tracking.id as id', 'sales_man_tracking.date_time as date_time', 'sales_man_tracking.outlet_name as outlet_name', 'sales_man_tracking.contact_person_name as contact_person_name', 'sales_man_tracking.contact_person_number as contact_person_number', 'au.name as name'])
            .getRawMany<SalesManTracking>();
    }



}

