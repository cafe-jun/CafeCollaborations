import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Optional } from '@core/common/type/common.types';
import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { User } from '@core/domain/user/entity/user';
import { TokenPayload } from '../../../../application/auth/jwt/token.payload';
import { TokenExpiredException, UnAuthorizedAccessException } from '../exception/auth.exception';
import { AuthToken } from '@application/auth/jwt/auth-token';
import { CoreAssert } from '../../../common/util/assert/core.assert';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

import { UserProvider } from '@core/common/enums/user-provider.enum';
import { OAuthValidateToken } from '../validate/oauth.validate';
import { GoogleValidateToken } from '../validate/google.validate';
import { KakaoValidateToken } from '../validate/kakao.validate';
import { NaverValidateToken } from '../validate/naver.validate';
import { isEmpty } from '@shared/data.helper';

@Injectable()
export class AuthService {
  private providerValidateTokens: Record<UserProvider, OAuthValidateToken>;
  constructor(
    @InjectRedis()
    private readonly redisClient: Redis,
    @Inject(UserDiTokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {
    this.providerValidateTokens = {
      [UserProvider.GOOGLE]: new GoogleValidateToken(),
      [UserProvider.KAKAO]: new KakaoValidateToken(),
      [UserProvider.NAVER]: new NaverValidateToken(),
    };
  }

  async validateEmail(email: string) {
    const user: Optional<User> = await this.userRepository.findUserByEmail(email);
    CoreAssert.isEmpty(user, new UnAuthorizedAccessException());
    return user;
  }

  public async ssoLogin(token: string, provider: UserProvider): Promise<AuthToken> {
    const validateToken = this.providerValidateTokens[provider];
    if (isEmpty(validateToken)) {
      throw new NotFoundException('일차하는 Provider가 없습니다.');
    }
    const user = await validateToken.validateToken(token);
    const isExistUser = await this.userRepository.findUserByEmail(user.getEmail());
    if (!isExistUser) {
      const result = await this.userRepository.addUser(user);
      const authToken = await this.generateToken(result.id, user.getEmail());
      await this.updateRefreshToken(result.id, authToken.refreshToken);
      return authToken;
    }
    const authToken = await this.generateToken(isExistUser.getId(), user.getEmail());
    await this.updateRefreshToken(user.getId(), authToken.refreshToken);
    return authToken;
  }

  public async findByUserById(id: number): Promise<Optional<User>> {
    return await this.userRepository.findUserById(id);
  }

  async refreshToken(id: number, email: string, refreshToken: string): Promise<AuthToken> {
    const user = await this.userRepository.findUserById(id);
    CoreAssert.isEmpty(user, new UnAuthorizedAccessException());
    const userRefreshToken = await this.redisClient.get(`REFRESH_TOKEN:${id}`);
    CoreAssert.isEqual(userRefreshToken, refreshToken, new TokenExpiredException());
    const token = await this.generateToken(id, email);
    await this.updateRefreshToken(id, token.refreshToken);
    return token;
  }

  async generateToken(id: number, email: string): Promise<AuthToken> {
    const payload: TokenPayload = { sub: id, email: email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: +process.env.JWT_ACCESS_EXPIRATION_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: +process.env.JWT_REFRESH_EXPIRATION_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }
  private async updateRefreshToken(id: number, refreshToken: string) {
    await this.redisClient.set(`REFRESH_TOKEN ${id}`, refreshToken, 'EX', 60 * 60 * 24 * 7);
  }
}
