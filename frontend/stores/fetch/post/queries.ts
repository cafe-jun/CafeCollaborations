import PostService from '@/stores/fetch/post/post.service';

const queryKeys = {
  all: ['post'] as const,
  detail: (postId: number) => [...queryKeys.all, postId] as const,
  detailComments: (postId: number) =>
    [...queryKeys.detail(postId), 'comments'] as const,
};

const queryOptions = {
  all: (query: {
    pageNo: number;
    pageSize: number;
    keyword: string;
    regionItems: string[];
    categoryItems: string[];
  }) => ({
    queryKey: queryKeys.all,
    queryFn: () =>
      PostService.getPost({
        pageNo: query.pageNo,
        pageSize: query.pageSize,
        keyword: query.keyword,
        regionItems: query.regionItems,
        categoryItems: query.categoryItems,
      }),
  }),
  create: () => ({
    queryKey: queryKeys.all,
    queryFn: () =>
      PostService.getPost({
        pageNo: 1,
        pageSize: 20,
        keyword: '',
        regionItems: [],
        categoryItems: [],
      }),
  }),
  detail: (postId: number) => ({
    queryKey: queryKeys.detail(postId),
    queryFn: () => PostService.getPostDetail(postId),
  }),
  comments: (postId: number) => ({
    queryKey: queryKeys.detailComments(postId),
    queryFn: () => PostService.getComments(postId),
  }),
};

export default queryOptions;
