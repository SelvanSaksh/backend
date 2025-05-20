import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Retailers } from "./entities/Retailers.entity";
import { DataSource } from "typeorm";
import { UserSurvey } from "./entities/UserSurvey.entity";
import { CreateRetailerDto } from "./dto/create.store.dto";
import { UserStore } from "src/user/entities/UserStore.entity";
import { AdminUser } from "src/user/entities/user.entity";
import { StoreSurvey } from "./entities/StoreSurvey.entity";
@Injectable()
export class StoreService {

    constructor(
        @InjectRepository(Retailers)
        private retailerRepository: Repository<Retailers>,
        private dataSource: DataSource,
        @InjectRepository(UserStore)
        private userStoreRepository: Repository<UserStore>,
        @InjectRepository(AdminUser)
        private usersRepository: Repository<AdminUser>,
        @InjectRepository(UserSurvey)
        private userSurveyRepository: Repository<UserSurvey>,
        @InjectRepository(StoreSurvey)
        private storeSurveyRepository: Repository<StoreSurvey>,



    ) { }



    async createStore(createRetailerDto: CreateRetailerDto): Promise<Retailers> {
        const { parent_retailer } = createRetailerDto;

        let outlet_code = '';
        if (parent_retailer !== 0) {
            const parent = await this.retailerRepository.findOne({ where: { id: Number(parent_retailer) } });
            const outletPrefix = parent?.retailer.slice(0, 2);
            outlet_code = outletPrefix + Math.floor(100 + Math.random() * 900).toString();
        }

        const store = this.retailerRepository.create({ ...createRetailerDto, outlet_code });
        return this.retailerRepository.save(store);
    }


    // find store by user id
    async findStoreByUserId(userId: number): Promise<Retailers[]> {
        const storeList = await this.usersRepository
            .createQueryBuilder('user')
            .innerJoin('user_store', 'us', 'user.id = us.user_id')
            .innerJoin('retailers', 'r', 'us.store_id = r.id')
            .where('user.id = :userId', { userId })
            .select(['r.id as id', 'r.retailer as retailer', 'r.outlet_code as outlet_code'])
            .getRawMany<Retailers>();

        if (storeList.length === 0) {
            throw new NotFoundException('This user has no store assigned');
        }
        return storeList;
    }

    // find survey by store id
    async findSurveyByStoreId(storeId: number): Promise<UserSurvey[]> {
        console.log(storeId);
        const surveyList = await this.userStoreRepository
            .createQueryBuilder('us')
            .innerJoin('store_survey', 'ss', 'us.store_id = ss.store_id')
            .innerJoin('survey', 's', 'ss.survey_id = s.id')
            .where('us.store_id = :storeId', { storeId })
            .select(['s.id as id', 's.survey_name as survey_name'])
            .getRawMany<UserSurvey>();

        if (surveyList.length === 0) {
            throw new NotFoundException('No survey found for this store');
        }
        return surveyList;
    }



    async findAllStores(): Promise<Retailers[]> {
        return this.retailerRepository.find();
    }

}
