import { Optional } from '@core/common/type/common.types';
import { Post } from '../../entity/post';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { RepositoryRemoveOptions } from '@core/common/persistence/repoistory.option';

export interface PostRepositoryPort {
  findPostById(payload: { id: number }): Promise<Optional<Post>>;
  findPosts(
    paging: { pageNo: number; pageSize: number },
    filters?: { category?: string; regionCode?: string; keyword?: string },
  ): Promise<{ items: Post[]; totalCount: number }>;
  addPost(post: Post): Promise<{ id: number }>;
  updatePost(post: Post): Promise<{ id: number }>;
  removePost(post: Post, options?: RepositoryRemoveOptions): Promise<void>;
}
