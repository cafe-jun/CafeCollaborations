import { PostStatus } from '@core/common/enums/post-status.enum';
import { Nullable } from '@core/common/type/common.types';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { Post } from '../../entity/post';
import { PostImage } from '../../entity/post-image';
import { PostOwner } from '../../entity/post-owner';
import { Region } from '@core/common/enums/region.enum';
import { Duration } from '@core/common/enums/duration-type.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { Category } from '@core/common/enums/category.enum';

export class PostUseCaseDto {
  @Expose()
  public id: number;

  public image: Nullable<{ id: number; url: string }>;

  public owner: { id: number; name: string };

  @Expose()
  public title: string;

  @Expose()
  public content: string;

  @Expose()
  public status: PostStatus;

  @Expose()
  @Transform(({ value }) => value.code, { toClassOnly: true })
  public category: Category;

  @Expose()
  @Transform(({ value }) => value.code, { toClassOnly: true })
  public region: Region;

  @Expose()
  @Transform(({ value }) => value.code, { toClassOnly: true })
  public duration: Duration;

  @Expose()
  @Transform(({ value }) => value.code, { toClassOnly: true })
  public recruitMember: RecruitMember;

  public createdAt: Date;

  public editedAt: Nullable<Date>;

  public publishedAt: Nullable<Date>;

  public static newFromPost(post: Post): PostUseCaseDto {
    const dto: PostUseCaseDto = plainToInstance(PostUseCaseDto, post);
    const postOwner: PostOwner = post.getOwner();
    const postImage: Nullable<PostImage> = post.getImage();

    dto.owner = { id: postOwner.getId(), name: postOwner.getName() };
    dto.image = null;

    if (postImage) {
      dto.image = { id: postImage.getId(), url: postImage.getRelativePath() };
    }
    dto.region = post.getRegion();
    dto.category = post.getCategory();
    dto.duration = post.getDuration();
    dto.recruitMember = post.getRecruitMember();
    dto.createdAt = post.getCreatedAt();
    dto.editedAt = post.getEditedAt() || null;
    dto.publishedAt = post.getPublishedAt() || null;
    return plainToInstance(PostUseCaseDto, dto);
  }

  public static newListFromPosts(posts: Post[]): PostUseCaseDto[] {
    return posts.map((post) => this.newFromPost(post));
  }
}
