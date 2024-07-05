import { JwtAccessTokenPayload } from '@auth/jwt/access-token.payload';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
      // validate 함수에 첫번째 인자에 request를 넘겨줌
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtAccessTokenPayload) {
    // request에 저장을 해놔야 Guard후에 controller 메서드에서 사용 가능
    req.user = payload;
    return payload;
  }
}
