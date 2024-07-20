import { Optional } from '@core/common/type/common.types';
import { Post } from '../../entity/post';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { RepositoryRemoveOptions } from '@core/common/persistence/repoistory.option';

export interface PostRepositoryPort {
  findPostById(payload: { id: number }): Promise<Optional<Post>>;
  findPosts(payload: { ownerId?: number; status?: PostStatus }): Promise<Optional<Post[]>>;
  countPosts(): Promise<number>;
  addPost(Post: Post): Promise<{ id: number }>;
  updatePost(Post: Post): Promise<{ id: number }>;
  removePost(post: Post, options?: RepositoryRemoveOptions): Promise<void>;
}
