import { Category } from '@core/common/enums/category.enum';
import { Duration } from '@core/common/enums/duration-type.enum';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { Region } from '@core/common/enums/region.enum';
import { Optional } from '@core/common/type/common.types';
import { Post } from '@core/domain/post/entity/post';
import { PostOwner } from '@core/domain/post/entity/post-owner';
import {
  Post as PrismaPost,
  Region as PrismaRegion,
  RecruitMember as PrismaRecruitMember,
  Duration as PrismaDurationType,
  Category as PrismaCategory,
} from '@prisma/client';

export class PrismaPostMapper {
  private constructor() {
    throw new Error('PrismaPostMapper is a static class and should not be instantiated');
  }
  public static toPrisma(post: Post, id?: number): PrismaPost {
    return {
      id,
      userId: post.getOwner().getId(),
      title: post.getTitle(),
      category: post.getCategory().code as PrismaCategory,
      content: post.getContent(),
      status: post.getStatus(),
      duration: post.getDuration().code as PrismaDurationType,
      recruitMembers: post.getRecruitMember().code as PrismaRecruitMember,
      region: post.getRegion().code as PrismaRegion,
      imageId: null,
      createdAt: post.getCreatedAt(),
      publishedAt: post.getPublishedAt(),
      editedAt: post.getEditedAt(),
      removedAt: post.getRemovedAt(),
      updatedAt: post.getUpdateAt(),
    };
  }

  public static toDomain(prismaPost: PrismaPost): Post {
    const post = new Post({
      id: prismaPost.id,
      owner: new PostOwner(prismaPost.userId, 'test'),
      title: prismaPost.title,
      content: prismaPost.content,
      status: prismaPost.status as PostStatus,
      createdAt: prismaPost.createdAt,
      editedAt: prismaPost.editedAt,
      removedAt: prismaPost.removedAt,
      category: Category.getByCode(prismaPost.category),
      region: Region.getByCode(prismaPost.region),
      recruitMember: RecruitMember.getByCode(prismaPost.recruitMembers),
      duration: Duration.getByCode(prismaPost.duration),
      publishedAt: prismaPost.publishedAt,
    });
    return post;
  }
  public static toDomainEntities(prismaPosts: PrismaPost[]): Optional<Post[]> {
    return prismaPosts.map((prismaPost) => this.toDomain(prismaPost));
  }
}
