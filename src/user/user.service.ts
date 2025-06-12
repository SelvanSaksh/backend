import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUser } from './entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto'
import { UpdateUserDto } from './dto/update.user.dto'
import { Role } from 'src/common/entities/Role.entity';
import { CreateRoleDto } from './dto/create.Role.dto';
import { Retailers } from 'src/Stores/entities/Retailers.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(AdminUser)
        private usersRepository: Repository<AdminUser>,
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<AdminUser> {
        const { user_name, email, pass, user_role, name } = createUserDto;
        const existingUser = await this.usersRepository.findOne({
            where: [{ email }],
        });
        if (existingUser) {
            throw new ConflictException('Username or email already exists');
        }
        const hashedPassword = await bcrypt.hash(pass, 10);
        const user = this.usersRepository.create({
            user_name: user_name,
            email,
            pass: hashedPassword,
            user_role: user_role,
            name: name,
        });
        return this.usersRepository.save(user);
    }

    findAll(): Promise<AdminUser[]> {
        return this.usersRepository.find();
    }



    async findOne(id: number): Promise<AdminUser> {
        const user = await this.usersRepository.findOne({
            where: { id }, relations: ['role', 'company_site'], select: {
                role: {
                    id: true,
                    role_name: true,
                },
                company_site: {
                    id: true,
                    retailer: true,
                },
            }
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findOneByEmail(email: string): Promise<AdminUser> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<AdminUser> {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const updates: Partial<AdminUser> = { ...updateUserDto };
        if (updateUserDto.pass) {
            updates.pass = await bcrypt.hash(updateUserDto.pass, 10);
        }
        Object.assign(user, updates);
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }


    // create Role

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        const role = this.rolesRepository.create(createRoleDto);
        return this.rolesRepository.save(role);
    }


    async getRoles(): Promise<any> {
        const role = this.rolesRepository.find();
        return role
    }


}
