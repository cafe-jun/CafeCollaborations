import { UserProvider } from '@core/common/enums/user-provider.enum';
import { Post } from '@core/domain/post/entity/post';
import { User } from '@core/domain/user/entity/user';
import { OauthProvider, Post as PrismaPost } from '@prisma/client';

export class PrismaPostMapper {
  private constructor() {
    throw new Error('PrismaPostMapper is a static class and should not be instantiated');
  }
  public static toPrisma(post: Post): PrismaPost {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      provider: user.getProvider() as OauthProvider,
      createdAt: user.getCreatedAt(),
    };
  }

  public static toDomain(prismaPost: PrismaPost): Post {
    return new Post(
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
