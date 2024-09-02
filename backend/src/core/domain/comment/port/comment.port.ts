export type CreateCommentPort = {
  executorId: number;
  postId: number;
  content: string;
};

export type GetAllCommentPort = {
  postId: number;
  pageNo: number;
  pageSize: number;
};
