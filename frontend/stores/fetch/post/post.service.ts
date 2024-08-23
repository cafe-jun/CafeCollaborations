import Service from '@/stores/fetch/service';
import { PostModel } from '@/stores/model/post/post.model';
import { createApiQueryUrl } from '@/util/react-query';

class PostService extends Service {
  getPost(query: {
    pageNo: number;
    pageSize: number;
    keyword: string;
    regionItems: string[];
    categoryItems: string[];
  }): Promise<{
    data: PostModel[];
    meta: { totalCount: number; totalPage: number; currentPage: number };
  }> {
    const querys = createApiQueryUrl<{
      pageNo: number;
      pageSize: number;
      keyword: string;
      regionItems: string[];
      categoryItems: string[];
    }>('/post', {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      keyword: query.keyword,
      regionItems: query.regionItems,
      categoryItems: query.categoryItems,
    });
    return this.http
      .get<{
        data: PostModel[];
        meta: { totalCount: number; totalPage: number; currentPage: number };
      }>(querys)
      .then((res) => {
        return { data: res.data, meta: res.meta };
      });
  }

  getPostDetail(postId: number): Promise<PostModel> {
    return this.http
      .get<{ data: PostModel }>(`/post/${postId}`)
      .then((res) => res.data);
  }

  createPost(payload: {
    title: string;
    content: string;
    region: string;
    category: string;
    recruitMember: string;
    duration: string;
    imageId: number;
  }): Promise<{ id: number }> {
    return this.http
      .post<{ data: { id: number } }>('/post', payload)
      .then((res) => res.data);
  }

  getComments(postId: number) {
    return this.http.get<PostModel[]>(`/post/${postId}/comments`);
  }

  getComment({ postId, commentId }: { postId: number; commentId: number }) {
    return this.http.get<PostModel[]>(`/post/${postId}/comments/${commentId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PostService();
