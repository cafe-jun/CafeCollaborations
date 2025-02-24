import { Expose, plainToInstance, Transform } from 'class-transformer';
import { CommentOwner } from '../../entity/comment-owner';
import { Comment } from '../../entity/comment';

export class CommentUseCaseDto {
  @Expose()
  public id: number;

  @Expose()
  public owner: { id: number; name: string };

  @Expose()
  public content: string;

  @Expose()
  public createdAt: Date;

  public static newFromComment(comment: Comment): CommentUseCaseDto {
    const commentOwner: CommentOwner = comment.getOwner();
    const result: CommentUseCaseDto = {
      id: comment.getId(),
      owner: { id: commentOwner.getId(), name: commentOwner.getName() },
      content: comment.getContent(),
      createdAt: comment.getCreatedAt(),
    };

    return result;
  }

  public static newListFromComments(comments: Comment[]): CommentUseCaseDto[] {
    return comments.map((comment) => this.newFromComment(comment));
  }
}
