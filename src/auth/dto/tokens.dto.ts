export class TokensDto {
    token: {
        accessToken: string;
        refreshToken: string;
    }
    user?: any
}