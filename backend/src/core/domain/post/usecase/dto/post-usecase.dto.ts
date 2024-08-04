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

  public createdAt: number;

  public editedAt: Nullable<number>;

  public publishedAt: Nullable<number>;

  public static newFromPost(post: Post): PostUseCaseDto {
    const dto: PostUseCaseDto = plainToInstance(PostUseCaseDto, post);
    const postOwner: PostOwner = post.getOwner();
    const postImage: Nullable<PostImage> = post.getImage();

    dto.owner = { id: postOwner.getId(), name: postOwner.getName() };
    dto.image = null;

    if (postImage) {
      dto.image = { id: postImage.getId(), url: postImage.getRelativePath() };
    }

    dto.createdAt = post.getCreatedAt().getTime();
    dto.editedAt = post.getEditedAt()?.getTime() || null;
    dto.publishedAt = post.getPublishedAt()?.getTime() || null;

    return dto;
  }

  public static newListFromPosts(posts: Post[]): PostUseCaseDto[] {
    return posts.map((post) => this.newFromPost(post));
  }
}
