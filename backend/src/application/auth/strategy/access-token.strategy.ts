import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../../core/domain/auth/service/auth.service';
import { ApiConfig } from '@infrastructure/config/api-config';
import { TokenPayload } from '../jwt/token.payload';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      secretOrKey: ApiConfig.JWT_ACCESS_KEY,
      ignoreExpiration: false,
      // validate 함수에 첫번째 인자에 request를 넘겨줌
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: TokenPayload) {
    // request에 저장을 해놔야 Guard후에 controller 메서드에서 사용 가능
    this.authService;
    return payload;
  }
}
