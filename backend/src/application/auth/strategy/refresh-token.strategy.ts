import { AuthService } from '@core/domain/auth/service/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiConfig } from '@infrastructure/config/api-config';
import { TokenPayload } from '../jwt/token.payload';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh_token') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      secretOrKey: ApiConfig,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = req?.cookies?.refresh_token;

    // refresh token이 없을 경우 예외 발생
    if (!refreshToken) {
      throw new UnauthorizedException('refresh token is undefined');
    }

    // 저장된 refresh token과 비교
    // const result = await this.authService.compareUserRefreshToken(payload.sub, refreshToken);
    // // 결과가 틀렸다면 예외 발생
    // if (!result) {
    //   throw new UnauthorizedException('refresh token is wrong');
    // }
    req.user = payload;

    return payload;
  }
}
