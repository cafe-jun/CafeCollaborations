import { Inject, Injectable } from '@nestjs/common';
import { Optional } from '@core/common/type/common.types';
import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { User } from '@core/domain/user/entity/user';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserDiTokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string) {
    const user: Optional<User> = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return null;
    }
    return user;
  }

  async compareUserRefreshToken(userId: number, refreshToken: string) {}

  public async findByUserById(id: number): Promise<Optional<User>> {
    return await this.userRepository.findUserById(id);
  }

  async refreshToken(id: number, email: string, refreshToken: string): Promise<MsgToken> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new UnAuthorizedAccessException();
    }
    if (!(refreshToken === user.refreshToken)) {
      throw new TokenExpiredException();
    }
    const msgToken = await this.generateToken(id, email);
    await this.updateRefreshToken(id, msgToken.refreshToken);
    return msgToken;
  }

  async generateToken(id: number, email: string): Promise<MsgToken> {
    const payload: JwtPayload = { sub: id, email: email };
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
    return await this.userService.update(id, { refreshToken });
  }
}
