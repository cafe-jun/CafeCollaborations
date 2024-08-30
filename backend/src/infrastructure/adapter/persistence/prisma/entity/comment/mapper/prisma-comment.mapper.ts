import { Optional } from '@core/common/type/common.types';
import { Comment } from '@core/domain/comment/entity/comment';
import { CommentOwner } from '@core/domain/comment/entity/comment-owner';
import { Comment as PrismaComment } from '@prisma/client';

export class PrismaCommentMapper {
  private constructor() {
    throw new Error('PrismaPostMapper is a static class and should not be instantiated');
  }
  public static toPrisma(comment: Comment, id?: number): PrismaComment {
    return {
      id,
      content: comment.getContent(),
      postId: comment.getPostId(),
      userId: comment.getOwner().getId(),
      createdAt: new Date(),
    };
  }

  public static toDomain(prismaComment: PrismaComment): Comment {
    const comment = new Comment(
      {
        owner: new CommentOwner({
          id: prismaComment.userId,
          name: prismaComment.userId.toString(),
        }),
        content: prismaComment.content,
        postId: prismaComment.postId,
      },
      prismaComment.id,
    );
    return comment;
  }
  public static toDomainEntities(prismaComments: PrismaComment[]): Optional<Comment[]> {
    return prismaComments.map((prismaPost) => this.toDomain(prismaPost));
  }
}
