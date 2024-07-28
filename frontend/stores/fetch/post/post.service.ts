import Service from "@/stores/fetch/service";
import { PostModel } from "@/stores/model/post/post.model";
import { createApiQueryUrl } from "@/util/react-query";

class PostService extends Service {
  getPost(query: { pageNo: number; pageSize: number }) {
    const querys = createApiQueryUrl<{ pageNo: number; pageSize: number }>(
      "/post",
      { pageNo: query.pageNo, pageSize: query.pageSize }
    );
    return this.http
      .get<{ data: PostModel[] }>(querys)
      .then((res) => res?.data);
  }

  getPostDetail(postId: number) {
    return this.http.get<PostModel>(`/post/${postId}`);
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
