import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminUser } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { TokensDto } from './dto/tokens.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<AdminUser | null> {
        const user = await this.userService.findOneByEmail(email);
        if (user && (await bcrypt.compare(pass, user.pass))) {
            return user;
        }
        return null;
        
    }

    async login(loginDto: LoginDto): Promise<TokensDto> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.generateTokens(user);
    }

    async refreshTokens(user: AdminUser): Promise<TokensDto> {
        return this.generateTokens(user);
    }

    private async generateTokens(user: AdminUser): Promise<TokensDto> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { sub: user.id, email: user.email },
                { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
            ),
            this.jwtService.signAsync(
                { sub: user.id, email: user.email },
                { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
            ),
        ]);

        const token = { accessToken, refreshToken }

        return { user, token };
    }

}
