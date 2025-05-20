import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';
import { GetUser } from './decorators/get-user.decorator';
import { AdminUser } from '../user/entities/user.entity';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto): Promise<TokensDto> {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetUser() user: AdminUser): Promise<TokensDto> {
        return this.authService.refreshTokens(user);
    }

    // @Post('logout')
    // @UseGuards(AuthGuard('jwt'))
    // @HttpCode(HttpStatus.OK)
    // logout(@GetUser() user: User): Promise<void> {
    //     return this.authService.logout(user);
    // }
}
