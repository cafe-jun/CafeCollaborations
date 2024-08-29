import { Optional } from '@core/common/type/common.types';
import { Post } from '@core/domain/post/entity/post';
import { Comment } from '../../entity/comment';

export interface CommentRepositoryPort {
  findCommentById({ id }: { id: number }): Promise<Optional<Post>>;
  findComments(postId: number, paging: { pageNo: number; pageSize: number }): Promise<{ items: Post[]; totalCount: number }>;
  addComment(comment: Comment): Promise<{ id: number }>;
}
