import { UserDto } from '@core/domain/user/user.dto';
import { User as PrismaUser } from '@prisma/client';
export class PrismaUserMapper {
  private constructor() {
    throw new Error('PrismaUserMapper is a static class and should not be instantiated');
  }
  public toOrmEntities(user: UserDto): PrismaUser {
    return {
      name: user.getName(),
      email: user.getEmail(),
      provider: user.getProvider(),
    };
  }
}
