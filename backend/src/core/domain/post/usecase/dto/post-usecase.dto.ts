import { PostStatus } from '@core/common/enums/post-status.enum';
import { Nullable } from '@core/common/type/common.types';
import { Expose, plainToInstance } from 'class-transformer';
import { Post } from '../../entity/post';
import { PostImage } from '../../entity/post-image';
import { PostOwner } from '../../entity/post-owner';

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

  public category: string;

  public createdAt: Date;

  public regionCode: string;

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
    dto.regionCode = post.getRegionCode();
    dto.createdAt = post.getCreatedAt();
    dto.editedAt = post.getEditedAt() || null;
    dto.publishedAt = post.getPublishedAt() || null;

    return dto;
  }

  public static newListFromPosts(posts: Post[]): PostUseCaseDto[] {
    return posts.map((post) => this.newFromPost(post));
  }
}
