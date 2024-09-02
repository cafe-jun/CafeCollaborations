import Service from '@/stores/fetch/service';
import { CommentModel } from '@/stores/model/comment/comment.model';
import { createApiQueryUrl } from '@/util/react-query';

class CommentService extends Service {
  getComments(query: {
    pageNo: number;
    pageSize: number;
    postId: number;
  }): Promise<{
    data: CommentModel[];
    meta: { totalCount: number; totalPage: number; currentPage: number };
  }> {
    const apiQuery = createApiQueryUrl<{
      pageNo: number;
      pageSize: number;
    }>(`/post/${query.postId}/comments`, {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    });
    return this.http
      .get<{
        data: CommentModel[];
        meta: { totalCount: number; totalPage: number; currentPage: number };
      }>(apiQuery)
      .then((res) => {
        return { data: res.data, meta: res.meta };
      });
  }

  createComment(payload: {
    postId: number;
    content: string;
  }): Promise<{ id: number }> {
    return this.http
      .post<{ data: { id: number } }>(
        `/post/${payload.postId}/comments`,
        payload
      )
      .then((res) => res.data);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CommentService();
