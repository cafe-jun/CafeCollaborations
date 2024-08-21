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

  @Expose()
  public image: Nullable<{ id: number; url: string }>;

  @Expose()
  public owner: { id: number; name: string };

  @Expose()
  public title: string;

  @Expose()
  public content: string;

  @Expose()
  public status: PostStatus;

  @Expose()
  public category: string;

  @Expose()
  public region: string;

  @Expose()
  public duration: string;

  @Expose()
  public recruitMember: string;

  public createdAt: Date;

  public editedAt: Nullable<Date>;

  public publishedAt: Nullable<Date>;

  public static newFromPost(post: Post): PostUseCaseDto {
    const dto: PostUseCaseDto = plainToInstance(PostUseCaseDto, post);
    const postOwner: PostOwner = post.getOwner();
    const postImage: Nullable<PostImage> = post.getImage();

    if (postImage) {
      dto.image = { id: postImage.getId(), url: postImage.getRelativePath() };
    }
    const result: PostUseCaseDto = {
      id: post.getId(),
      owner: { id: postOwner.getId(), name: postOwner.getName() },
      category: post.getCategory().code,
      region: post.getRegion().code,
      duration: post.getDuration().code,
      recruitMember: post.getRecruitMember().code,
      title: post.getTitle(),
      content: post.getContent(),
      createdAt: post.getCreatedAt(),
      editedAt: post.getEditedAt(),
      status: post.getStatus(),
      publishedAt: post.getPublishedAt(),
      image: { id: 1, url: 'http://localhost:3000' },
    };

    return result;
  }

  public static newListFromPosts(posts: Post[]): PostUseCaseDto[] {
    return posts.map((post) => this.newFromPost(post));
  }
}
