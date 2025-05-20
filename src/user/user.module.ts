import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities/user.entity';
import { Role } from 'src/common/entities/Role.entity';
@Module({
    imports:  [TypeOrmModule.forFeature([AdminUser, Role])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }
