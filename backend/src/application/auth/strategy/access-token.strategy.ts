import { Injectable, OnModuleInit } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../../core/domain/auth/service/auth.service';
import { ApiConfig } from '@infrastructure/config/api-config';
import { TokenPayload } from '../jwt/token.payload';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from '@shared/data.helper';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'access_token') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ApiConfig.JWT_ACCESS_SECRET,
      // validate 함수에 첫번째 인자에 request를 넘겨줌
      passReqToCallback: true,
    });
    // console.log(this.jwtService.sign({ sub: 2, email: 'test' }));
  }

  async validate(req: Request, payload: TokenPayload) {
    // request에 저장을 해놔야 Guard후에 controller 메서드에서 사용 가능

    const user = await this.authService.findByUserById(payload.sub);

    if (isEmpty(user)) {
      throw new Error('todo auth error ');
    }
    req.user = payload;
    return user;
  }
}
