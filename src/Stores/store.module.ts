import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreService } from "./store.service";
import { Retailers } from "./entities/Retailers.entity";
import { StoreController } from "./store.controller";       
import { UserSurvey } from "./entities/UserSurvey.entity" 
import { StoreSurvey } from "./entities/StoreSurvey.entity";
import { UserStore } from "src/user/entities/UserStore.entity";
import { AdminUser } from "src/user/entities/user.entity";
// import { UserService } from "src/user/user.service";
@Module({
    imports: [TypeOrmModule.forFeature([Retailers , UserSurvey , StoreSurvey , UserStore , AdminUser])],
    controllers: [StoreController],
    providers: [StoreService ],
    exports: [StoreService],
})
export class StoreModule {}
    