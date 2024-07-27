export type PostModel = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type GetPostQuery = {
  pageNo: number;
  pageSize: number;
};
