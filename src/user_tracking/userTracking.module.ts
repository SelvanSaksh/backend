import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesManTracking } from "./entities/SalesManTracking.entity";
import { Module } from "@nestjs/common";
import { UserTrackingController } from "./userTracking.controller";
import { UserTrackingService } from "./userTracking.service";
import { AdminUser } from "../user/entities/user.entity";   
import { GeoServices } from "./geoservices/goeservices.service";
@Module({
    imports:[TypeOrmModule.forFeature([SalesManTracking, AdminUser])],
    controllers:[UserTrackingController],
    providers:[UserTrackingService , GeoServices],
    exports:[UserTrackingService , GeoServices]
})
export class UserTrackingModule {}
