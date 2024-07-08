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

  async validateUser() {}

  async compareUserRefreshToken(userId: number, refreshToken: string) {}

  public async findyUserById(id: number): Promise<Optional<User>> {
    return await this.userRepository.findUserById(id);
  }
}
