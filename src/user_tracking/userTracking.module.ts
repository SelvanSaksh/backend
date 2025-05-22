import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesManTracking } from "./entities/SalesManTracking.entity";
import { Module } from "@nestjs/common";
import { UserTrackingController } from "./userTracking.controller";
import { UserTrackingService } from "./userTracking.service";

@Module({
    imports:[TypeOrmModule.forFeature([SalesManTracking])],
    controllers:[UserTrackingController],
    providers:[UserTrackingService],
    exports:[UserTrackingService]
})
export class UserTrackingModule {}
