import { UserProvider } from '@core/common/enums/user.enum';
import { User } from '@core/domain/user/entity/user';
import { OauthProvider, User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  private constructor() {
    throw new Error('PrismaUserMapper is a static class and should not be instantiated');
  }
  public static toPrisma(user: User): PrismaUser {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      provider: user.getProvider() as OauthProvider,
      createdAt: user.getCreatedAt(),
    };
  }

  public static toDomain(prismaUser: PrismaUser): User {
    return new User(
      {
        email: prismaUser.email,
        name: prismaUser.name,
        provider: prismaUser.provider as UserProvider,
        createdAt: prismaUser.createdAt,
      },
      prismaUser.id,
    );
  }
}
