import { Inject, Injectable } from '@nestjs/common';
import { Optional } from '@core/common/type/common.types';
import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { User } from '@core/domain/user/entity/user';
import { TokenPayload } from '../../../../application/auth/jwt/token.payload';
import { TokenExpiredException, UnAuthorizedAccessException } from '../exception/auth.exception';
import { AuthToken } from '@application/auth/jwt/auth-token';
import { CoreAssert } from '../../../common/util/assert/core.assert';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserDiTokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string) {
    const user: Optional<User> = await this.userRepository.findUserByEmail(email);
    CoreAssert.isEmpty(user, new UnAuthorizedAccessException());
    return user;
  }

  public async findByUserById(id: number): Promise<Optional<User>> {
    return await this.userRepository.findUserById(id);
  }

  async refreshToken(id: number, email: string, refreshToken: string): Promise<AuthToken> {
    const user = await this.userRepository.findUserById(id);
    CoreAssert.isEmpty(user, new UnAuthorizedAccessException());
    CoreAssert.isEqual(user.getRefreshToken(), refreshToken, new TokenExpiredException());
    const token = await this.generateToken(id, email);
    await this.updateRefreshToken(id, token.refreshToken);
    return token;
  }

  async generateToken(id: number, email: string): Promise<AuthToken> {
    const payload: TokenPayload = { sub: id, email: email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }
  private async updateRefreshToken(id: number, refreshToken: string) {
    return await this.userRepository.updateUser(id, {});
  }
}
