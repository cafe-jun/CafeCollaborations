import { BaseEntity } from '@core/common/entity/base.entity';
import { Nullable } from '@core/common/type/common.types';
import { IsInstance, IsNumber, IsOptional, IsString } from 'class-validator';
import { RemoveEntity } from '@core/common/entity/remove.entity';
import { CommentOwner } from './comment-owner';
import { CreateCommentEntityPayload } from './type/entity.type';

export class Comment extends BaseEntity<number> implements RemoveEntity {
  @IsInstance(CommentOwner)
  private readonly owner: CommentOwner;

  @IsNumber()
  private postId: number;

  @IsOptional()
  @IsString()
  private content: Nullable<string>;

  constructor(payload: CreateCommentEntityPayload, id?: number) {
    super();
    this.id = id;
    this.owner = payload.owner;
    this.content = payload.content;
    this.postId = payload.postId;
  }

  public getId(): number {
    return this.id;
  }

  public getPostId(): number {
    return this.postId;
  }

  public getContent(): string {
    return this.content;
  }

  public getOwner(): CommentOwner {
    return this.owner;
  }

  public async remove(): Promise<void> {
    await this.validate();
  }
  public static async create(payload: CreateCommentEntityPayload): Promise<Comment> {
    const comment: Comment = new Comment(payload);
    await comment.validate();
    return comment;
  }
}
