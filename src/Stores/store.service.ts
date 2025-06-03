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
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { format, isValid, parse } from "date-fns";
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



    // async createStore(createRetailerDto: CreateRetailerDto): Promise<Retailers> {
    //     const { parent_retailer } = createRetailerDto;

    //     let outlet_code = '';
    //     if (parent_retailer !== 0) {
    //         const parent = await this.retailerRepository.findOne({ where: { id: Number(parent_retailer) } });
    //         const outletPrefix = parent?.retailer.slice(0, 2);
    //         outlet_code = outletPrefix + Math.floor(100 + Math.random() * 900).toString();
    //     }

    //     const store = this.retailerRepository.create({ ...createRetailerDto, outlet_code });
    //     return this.retailerRepository.save(store);
    // }


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

    async processCSV(filePath: string): Promise<any> {
        const results: any = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    // Transform parent_retailer
                    if (data.parent_retailer === 'NULL' || data.parent_retailer === '' || data.parent_retailer === null) {
                        data.parent_retailer = null;
                    } else {
                        const parsed = parseInt(data.parent_retailer, 10);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid parent_retailer value: ${data.parent_retailer} in row ${results.length + 1}`);
                            data.parent_retailer = null;
                        } else {
                            data.parent_retailer = parsed;
                        }
                    }

                    // Transform secret_key
                    if (data.secret_key === 'NULL' || data.secret_key === '' || data.secret_key === null) {
                        data.secret_key = null;
                    } else {
                        const parsed = parseInt(data.secret_key, 10);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid secret_key value: ${data.secret_key} in row ${results.length + 1}`);
                            data.secret_key = null;
                        } else {
                            data.secret_key = parsed;
                        }
                    }

                    if (data.size_in_sft === 'NULL' || data.size_in_sft === '' || data.size_in_sft === null) {
                        data.size_in_sft = null;
                    } else {
                        const parsed = parseInt(data.size_in_sft, 10);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid size_in_sft value: ${data.size_in_sft} in row ${results.length + 1}`);
                            data.size_in_sft = null;
                        } else {
                            data.size_in_sft = parsed;
                        }
                    }


                    if (data.no_of_employees === 'NULL' || data.no_of_employees === '' || data.no_of_employees === null) {
                        data.no_of_employees = null;
                    } else {
                        const parsed = parseInt(data.no_of_employees, 10);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid no_of_employees value: ${data.no_of_employees} in row ${results.length + 1}`);
                            data.no_of_employees = null;
                        } else {
                            data.no_of_employees = parsed;
                        }
                    }

                    if (data.monthly_rent === 'NULL' || data.monthly_rent === '' || data.monthly_rent === null) {
                        data.monthly_rent = null;
                    } else {
                        const parsed = parseInt(data.monthly_rent, 10);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid monthly_rent value: ${data.monthly_rent} in row ${results.length + 1}`);
                            data.monthly_rent = null;
                        } else {
                            data.monthly_rent = parsed;
                        }
                    }

                    if (data.monthly_rent === 'NULL' || data.monthly_rent === '' || data.monthly_rent === null) {
                        data.monthly_rent = null;
                    } else {
                        const parsed = parseInt(data.monthly_rent, 10);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid monthly_rent value: ${data.monthly_rent} in row ${results.length + 1}`);
                            data.monthly_rent = null;
                        } else {
                            data.monthly_rent = parsed;
                        }
                    }

                    if (data.display_size_sqft === 'NULL' || data.display_size_sqft === '' || data.display_size_sqft === null) {
                        data.display_size_sqft = null;
                    } else {
                        const parsed = parseInt(data.display_size_sqft, 10);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid display_size_sqft value: ${data.display_size_sqft} in row ${results.length + 1}`);
                            data.display_size_sqft = null;
                        } else {
                            data.display_size_sqft = parsed;
                        }
                    }

                    if (data.avg_sku === 'NULL' || data.avg_sku === '' || data.avg_sku === null) {
                        data.avg_sku = null;
                    } else {
                        const parsed = parseInt(data.avg_sku, 10);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid avg_sku value: ${data.avg_sku} in row ${results.length + 1}`);
                            data.avg_sku = null;
                        } else {
                            data.avg_sku = parsed;
                        }
                    }

                    if (data.creation_date === 'NULL' || data.creation_date === '' || data.creation_date === null) {
                        data.creation_date = null;
                    } else {
                        try {
                            const parsedDate = parse(data.creation_date, 'M-d-yy h:mm a', new Date());
                            if (isValid(parsedDate)) {
                                data.creation_date = format(parsedDate, 'yyyy-MM-dd');
                            } else {
                                console.warn(`Invalid creation_date value: ${data.creation_date} in row ${results.length + 1}`);
                                data.creation_date = null;
                            }
                        } catch (error) {
                            console.warn(`Error parsing creation_date: ${data.creation_date} in row ${results.length + 1}`);
                            data.creation_date = null;
                        }
                    }



                    // Transform site_open_date
                    if (data.site_open_date === 'NULL' || data.site_open_date === '' || data.site_open_date === null) {
                        data.site_open_date = null;
                    } else {
                        try {
                            const parsedDate = parse(data.site_open_date, 'M-d-yy h:mm a', new Date());
                            if (isValid(parsedDate)) {
                                data.site_open_date = format(parsedDate, 'yyyy-MM-dd');
                            } else {
                                console.warn(`Invalid site_open_date value: ${data.site_open_date} in row ${results.length + 1}`);
                                data.site_open_date = null;
                            }
                        } catch (error) {
                            console.warn(`Error parsing site_open_date: ${data.site_open_date} in row ${results.length + 1}`);
                            data.site_open_date = null;
                        }
                    }


                    if (data.latitude === 'NULL' || data.latitude === '' || data.latitude === null || data.latitude === 'IN') {
                        data.latitude = null;
                    } else {
                        const parsed = parseFloat(data.latitude);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid latitude value: ${data.latitude} in row ${results.length + 1}`);
                            data.latitude = null;
                        } else {
                            // Check DECIMAL(10,6) range: ±9999.999999
                            const fixed = Number(parsed.toFixed(6));
                            const totalDigits = Math.floor(Math.abs(fixed)).toString().length;
                            if (totalDigits > 4 || Math.abs(fixed) > 9999.999999) {
                                console.warn(`Out of range latitude value: ${data.latitude} in row ${results.length + 1}`);
                                data.latitude = null;
                            } else {
                                data.latitude = fixed;
                            }
                        }
                    }

                    // Transform longitude
                    if (data.longitude === 'NULL' || data.longitude === '' || data.longitude === null || data.longitude === 'IN') {
                        data.longitude = null;
                    } else {
                        const parsed = parseFloat(data.longitude);
                        if (isNaN(parsed)) {
                            console.warn(`Invalid longitude value: ${data.longitude} in row ${results.length + 1}`);
                            data.longitude = null;
                        } else {
                            // Check DECIMAL(10,6) range: ±9999.999999
                            const fixed = Number(parsed.toFixed(6));
                            const totalDigits = Math.floor(Math.abs(fixed)).toString().length;
                            if (totalDigits > 4 || Math.abs(fixed) > 9999.999999) {
                                console.warn(`Out of range longitude value: ${data.longitude} in row ${results.length + 1}`);
                                data.longitude = null;
                            } else {
                                data.longitude = fixed;
                            }
                        }
                    }

                    results.push(data);
                })
                .on('end', async () => {
                    try {
                        console.log('Parsed Rows:', results.length);
                        const created = this.retailerRepository.create(results);
                        await this.retailerRepository.save(created);
                        resolve({ message: 'CSV Imported Successfully', count: created.length });
                    } catch (error) {
                        reject(error);
                    } finally {
                        fs.unlinkSync(filePath);
                    }
                })
                .on('error', (error) => {
                    console.error('Error processing CSV:', error);
                    reject(error);
                });
        });
    }
}
