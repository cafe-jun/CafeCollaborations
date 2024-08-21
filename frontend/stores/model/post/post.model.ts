export type PostModel = {
  id: number;
  title: string;
  content: string;
  category: string;
  duration: string;
  recruitMember: string;
  region: string;
  createdAt: string;
};

export type GetPostQuery = {
  pageNo: number;
  pageSize: number;
};
