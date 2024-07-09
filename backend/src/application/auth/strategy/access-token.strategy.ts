import { JwtAccessTokenPayload } from 'src/application/api/http-rest/auth/jwt/access-token.payload';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../../core/domain/auth/service/auth.service';
import { ApiConfig } from '@infrastructure/config/api-config';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      secretOrKey: ApiConfig.PORT,
      ignoreExpiration: false,
      // validate 함수에 첫번째 인자에 request를 넘겨줌
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtAccessTokenPayload) {
    // request에 저장을 해놔야 Guard후에 controller 메서드에서 사용 가능
    this.authService;
    return payload;
  }
}
