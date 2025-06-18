import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { AdminUser } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoleDto } from './dto/create.Role.dto';
import { Role } from 'src/common/entities/Role.entity';
import { Retailers } from 'src/Stores/entities/Retailers.entity';


@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Post('/register')
    create(@Body() createUserDto: CreateUserDto): Promise<AdminUser> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<AdminUser[]> {
        return this.usersService.findAll();
    }


    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findUserById(@Param('id') id: number): Promise<AdminUser> {
        return this.usersService.findOne(id);
    }



    // @Get('store/:userId')
    // findStoreByUserId(@Param('userId') userId: number): Promise<Retailers[]> {
    //     return this.usersService.findStoreByUserId(userId);
    // }



    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return {
            message: 'Protected data',
            user: req.user,
        };
    }



    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<AdminUser> {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(+id);
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('role')
    createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.usersService.createRole(createRoleDto);
    }

    @Get('get/roles/:compId')
    getRoles(@Param('compId') compId:number): Promise<any> {
        return this.usersService.getRoles(compId);
    }
}
