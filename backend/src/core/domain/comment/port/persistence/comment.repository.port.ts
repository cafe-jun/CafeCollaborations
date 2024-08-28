import { Optional } from '@core/common/type/common.types';
import { RepositoryRemoveOptions } from '@core/common/persistence/repoistory.option';
import { Post } from '@core/domain/post/entity/post';

export interface PostRepositoryPort {
  findPostById(payload: { id: number }): Promise<Optional<Post>>;
  findPosts(
    paging: { pageNo: number; pageSize: number },
    filters?: { category?: string[]; region?: string[]; keyword?: string },
  ): Promise<{ items: Post[]; totalCount: number }>;
  addPost(post: Post): Promise<{ id: number }>;
  updatePost(post: Post): Promise<{ id: number }>;
  removePost(post: Post, options?: RepositoryRemoveOptions): Promise<void>;
}

export interface PostReaderRepository {}

export interface PostWriteRepository {}
