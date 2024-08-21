import { BaseEntity } from '@core/common/entity/base.entity';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { Nullable } from '@core/common/type/common.types';
import { IsDate, IsEnum, IsInstance, IsOptional, IsString } from 'class-validator';
import { PostOwner } from './post-owner';
import { PostImage } from './post-image';
import { CreatePostEntityPayload } from './type/create-post-entity.payload';
import { EditPostEntityPayload } from './type/edit-post-entity.payload';
import { RemoveEntity } from '@core/common/entity/remove.entity';

import { PostUseCaseDto } from '../usecase/dto/post-usecase.dto';
import { Region } from '@core/common/enums/region.enum';
import { Duration } from '@core/common/enums/duration-type.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { Category } from '@core/common/enums/category.enum';
export class Post extends BaseEntity<number> implements RemoveEntity {
  @IsInstance(PostOwner)
  private readonly owner: PostOwner;

  @IsString()
  private title: string;

  @IsEnum(Category)
  private category: Category;

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

  @IsOptional()
  @IsEnum(Region)
  private region: Region;

  @IsOptional()
  @IsEnum(Duration)
  private duration: Duration;

  @IsOptional()
  @IsEnum(RecruitMember)
  private recruitMember: RecruitMember;

  @IsOptional()
  @IsDate()
  private updatedAt: Date;

  constructor(payload: CreatePostEntityPayload) {
    super();
    this.id = payload.id;
    this.owner = payload.owner;
    this.title = payload.title;
    this.image = payload.image || null;
    this.content = payload.content || null;
    this.status = payload.status || PostStatus.DRAFT;
    this.createdAt = payload.createdAt || new Date();
    this.category = payload.category || Category.ACCOMMODATION_CODE;
    this.region = payload.region || Region.Seoul;
    this.duration = payload.duration || Duration.LessThanOneMonth;
    this.recruitMember = payload.recruitMember || RecruitMember.Indefinite;
    this.publishedAt = payload.publishedAt || null;
    this.removedAt = payload.removedAt || null;
  }

  public getOwner(): PostOwner {
    return this.owner;
  }

  public getTitle(): string {
    return this.title;
  }

  public getCategory(): Category {
    return this.category;
  }

  public getImage(): Nullable<PostImage> {
    return this.image;
  }

  public getContent(): Nullable<string> {
    return this.content;
  }

  public getStatus(): PostStatus {
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
  public getRegion(): Region {
    return this.region;
  }

  public getDuration(): Duration {
    return this.duration;
  }

  public getRecruitMember(): RecruitMember {
    return this.recruitMember;
  }

  public getUpdateAt(): Date | null {
    return this.updatedAt;
  }

  public async edit(payload: EditPostEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.title) {
      this.title = payload.title;
      this.editedAt = currentDate;
    }
    if (typeof payload.image !== 'undefined') {
      this.image = payload.image;
      this.editedAt = currentDate;
    }
    if (typeof payload.content !== 'undefined') {
      this.content = payload.content;
      this.editedAt = currentDate;
    }

    await this.validate();
  }

  public async publish(): Promise<void> {
    const currentDate = new Date();
    this.status = PostStatus.PUBLISHED;
    this.editedAt = currentDate;
    this.publishedAt = currentDate;
    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }
  public static async create(payload: CreatePostEntityPayload): Promise<Post> {
    const post: Post = new Post(payload);
    await post.validate();
    return post;
  }
}
