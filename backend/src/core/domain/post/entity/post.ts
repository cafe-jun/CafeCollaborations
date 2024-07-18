import { BaseEntity } from '@core/common/entity/base.entity';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { Nullable } from '@core/common/type/common.types';
import { IsDate, IsEnum, IsInstance, IsOptional, IsString } from 'class-validator';
import { PostOwner } from './post-owner';
import { PostImage } from './post-image';
import { CreatePostEntityPayload } from './type/create-post-entity.payload';

export class Post extends BaseEntity<number> {
  @IsInstance(PostOwner)
  private readonly owner: PostOwner;

  @IsString()
  private title: string;

  @IsOptional()
  @IsInstance(PostImage)
  private image: Nullable<PostImage>;

  @IsOptional()
  @IsString()
  private content: Nullable<string>;

  @IsOptional()
  @IsEnum(PostStatus)
  private status: PostStatus;

  @IsDate()
  private readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  private editedAt: Nullable<Date>;

  @IsOptional()
  @IsDate()
  private publishedAt: Nullable<Date>;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  constructor(payload: CreatePostEntityPayload) {
    super();
    this.owner = payload.owner;
    this.title = payload.title;
    this.image = payload.image || null;
    this.content = payload.content || null;
    this.status = payload.status || PostStatus.DRAFT;
    this.createdAt = payload.createdAt || new Date();
    this.editedAt = payload.editedAt || null;
    this.publishedAt = payload.publishedAt || null;
    this.removedAt = payload.removedAt || null;
  }

  public getOwner(): PostOwner {
    return this.owner;
  }

  public getTitle(): string {
    return this.title;
  }

  public getImage(): Nullable<PostImage> {
    return this.image;
  }

  public getContent(): Nullable<string> {
    return this.content;
  }

  public getStatus(): string {
    return this.status;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getEditedAt(): Nullable<Date> {
    return this.editedAt;
  }

  public getPublishedAt(): Nullable<Date> {
    return this.publishedAt;
  }

  public getRemovedAt(): Nullable<Date> {
    return this.removedAt;
  }

  public static async create(payload: CreatePostEntityPayload): Promise<Post> {
    const post: Post = new Post(payload);
    await post.validate();
    return post;
  }
}
