import { Between, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SalesManTracking } from "./entities/SalesManTracking.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserTrackingDto } from "./dto/create.userTracking.dto";
import { UserTrackingEnum } from "./enum/user.tracking.enum";
import * as dayjs from "dayjs";
import { GeoServices } from "./geoservices/goeservices.service";
import { add } from "date-fns";
import { start } from "repl";
@Injectable()
export class UserTrackingService {
    constructor(
        @InjectRepository(SalesManTracking) private salesManTrackingRepository: Repository<SalesManTracking>,
        private readonly geoServices: GeoServices
    ) { }

    startOfDay = dayjs().startOf('day').toDate();
    endOfDay = dayjs().endOf('day').toDate();



    // for day start
    async createSalesManTracking(createUserTrackingDto: CreateUserTrackingDto): Promise<SalesManTracking> {
        const address = await this.geoServices.getLoaction(createUserTrackingDto.latitude, createUserTrackingDto.longitude)
        // console.log("address",address)

        // console.log(this.startOfDay ,  this.endOfDay)
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
            map_address: address.address,
            city: address.groupaddress.city,
            state: address.groupaddress.state,
            pincode: address.groupaddress.pincode,

            user_tracking_type: UserTrackingEnum.DAY_START,
        });
        return this.salesManTrackingRepository.save(newDayStart);
    }

    // for day end
    async createSalesManTrackingDayEnd(createUserTrackingDto: CreateUserTrackingDto): Promise<SalesManTracking> {
        // console.log(this.startOfDay, this.endOfDay)
        const address = await this.geoServices.getLoaction(createUserTrackingDto.latitude, createUserTrackingDto.longitude)
        // console.log(address)

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
            map_address: address.address,
            city: address.groupaddress.city,
            state: address.groupaddress.state,
            pincode: address.groupaddress.pincode,

            user_tracking_type: UserTrackingEnum.DAY_END,
        });
        return this.salesManTrackingRepository.save(newDayEnd);
    }

    // For CheckIn
    async createSalesManTrackingCheckIn(createUserTrackingDto: CreateUserTrackingDto): Promise<SalesManTracking> {

        const address = await this.geoServices.getLoaction(createUserTrackingDto.latitude, createUserTrackingDto.longitude)

        const { user_id } = createUserTrackingDto;
        var visitDistance: string = '0';

        const checkStartDay = await this.salesManTrackingRepository.findOne({
            where: {
                user_id: user_id,
                user_tracking_type: UserTrackingEnum.DAY_START,
                date_time: Between(this.startOfDay, this.endOfDay)
            },
        });
        if (!checkStartDay) {
            throw new NotFoundException(" Day must be started");
        }

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


        // console.log("check data", this.startOfDay, this.endOfDay)
        const lastCheckInDetials = await this.salesManTrackingRepository.findOne({
            where: {
                user_id: user_id,
                user_tracking_type: UserTrackingEnum.CHECK_IN,
                date_time: Between(this.startOfDay, this.endOfDay),

            },
            order: { id: 'DESC' },
            select: ['latitude', 'longitude']
        })
        if (lastCheckInDetials) {
            visitDistance = await this.geoServices.getDistance(createUserTrackingDto.latitude, createUserTrackingDto.longitude, lastCheckInDetials.latitude, lastCheckInDetials.longitude)
        }

        // console.log("Calculated distance", visitDistance)
        const newCheckIn = this.salesManTrackingRepository.create({
            ...createUserTrackingDto,
            map_address: address.address,
            city: address.groupaddress.city,
            state: address.groupaddress.state,
            pincode: address.groupaddress.pincode,
            kms_covered: visitDistance,
            user_tracking_type: UserTrackingEnum.CHECK_IN,
        });
        return this.salesManTrackingRepository.save(newCheckIn);
    }

    async getTrackingStatusById(id: number) {

        const checkdaystartStatus = await this.salesManTrackingRepository.findOne({
            where: {
                user_id: id,
                user_tracking_type: UserTrackingEnum.DAY_START,
                date_time: Between(this.startOfDay, this.endOfDay),
            }
        })

        const checkDayEndStatus = await this.salesManTrackingRepository.findOne({
            where: ({
                user_id: id,
                user_tracking_type: UserTrackingEnum.DAY_END,
                date_time: Between(this.startOfDay, this.endOfDay),
            })
        })


        if (!checkdaystartStatus) {
            return {}
        }

        if (!checkDayEndStatus && checkdaystartStatus) {
            const dateTime = dayjs(checkdaystartStatus.date_time).format('YYYY-MM-DD HH:mm:ss')
            return {
                status: 'day_start',
                startTime: dateTime
            }
        }
        if (checkDayEndStatus && checkdaystartStatus) {
            const startDateTime= dayjs(checkdaystartStatus.date_time).format('YYYY-MM-DD HH:mm:ss')
            const endDateTime = dayjs(checkDayEndStatus.date_time).format('YYYY-MM-DD HH:mm:ss')
            return {
                status: 'day_end',
                startTime: startDateTime,
                endTime:endDateTime
            }
        }


    }


    async getAllcheckInDetails(user_id: string): Promise<SalesManTracking[]> {
        return this.salesManTrackingRepository
            .createQueryBuilder('sales_man_tracking')
            .leftJoin('admin_user', 'au', 'au.id = sales_man_tracking.user_id')
            .where('sales_man_tracking.user_id = :user_id', { user_id })
            .andWhere('sales_man_tracking.user_tracking_type = :user_tracking_type', { user_tracking_type: UserTrackingEnum.CHECK_IN })
            .select(['sales_man_tracking.id as id', 'sales_man_tracking.date_time as date_time', 'sales_man_tracking.outlet_name as outlet_name', 'sales_man_tracking.contact_person_name as contact_person_name', 'sales_man_tracking.contact_person_number as contact_person_number', 'au.name as name', 'sales_man_tracking.selfi'])
            .getRawMany<SalesManTracking>();
    }



}

