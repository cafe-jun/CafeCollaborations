export type GetCommentQuery = {
  postId: number;
  pageNo: number;
  pageSize: number;
};

export type CommentModel = {
  id: number;
  postId: number;
  content: string;
  createdAt: string;
};
