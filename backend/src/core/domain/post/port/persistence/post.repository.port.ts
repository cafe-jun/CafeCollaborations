import { Optional } from '@core/common/type/common.types';
import { Post } from '../../entity/post';

export interface PostRepositoryPort {
  findPostById(id: number): Promise<Optional<Post>>;
  findPosts(): Promise<Optional<Post>>;
  countPosts(): Promise<number>;
  addPost(Post: Post): Promise<{ id: number }>;
  updatePost(id, Post: Post): Promise<{ id: number }>;
}
