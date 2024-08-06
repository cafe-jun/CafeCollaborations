import { PostStatus } from '@core/common/enums/post-status.enum';
import { Optional } from '@core/common/type/common.types';
import { Post } from '@core/domain/post/entity/post';
import { PostOwner } from '@core/domain/post/entity/post-owner';
import { Post as PrismaPost } from '@prisma/client';

export class PrismaPostMapper {
  private constructor() {
    throw new Error('PrismaPostMapper is a static class and should not be instantiated');
  }
  public static toPrisma(post: Post): PrismaPost {
    return {
      id: post.getId(),
      userId: post.getOwner().getId(),
      title: post.getTitle(),
      category: post.getCategory(),
      content: post.getContent(),
      status: post.getStatus(),
      imageId: post.getImage().getId(),
      regionCode: post.getRegionCode() as string,
      createdAt: post.getCreatedAt(),
      editedAt: post.getEditedAt(),
      removedAt: post.getRemovedAt(),
    };
  }

  public static toDomain(prismaPost: PrismaPost): Post {
    const post = new Post({
      id: prismaPost.id,
      owner: new PostOwner(prismaPost.userId, `testset`),
      title: prismaPost.title,
      content: prismaPost.content,
      status: prismaPost.status as PostStatus,
      createdAt: prismaPost.createdAt,
      editedAt: prismaPost.editedAt,
      removedAt: prismaPost.removedAt,
      category: prismaPost.category,
      regionCode: prismaPost.regionCode,
    });
    return post;
  }
  public static toDomainEntities(prismaPosts: PrismaPost[]): Optional<Post[]> {
    return prismaPosts.map((prismaPost) => this.toDomain(prismaPost));
  }
}
