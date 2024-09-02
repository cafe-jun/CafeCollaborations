import CommentService from './comment.service';

const queryKeys = {
  all: ['comment'] as const,
};

const queryOptions = {
  all: (query: { pageNo: number; pageSize: number; postId: number }) => ({
    queryKey: queryKeys.all,
    queryFn: () =>
      CommentService.getComments({
        postId: query.postId,
        pageNo: query.pageNo,
        pageSize: query.pageSize,
      }),
  }),
  // create: () => ({
  //   queryKey: queryKeys.all,
  //   queryFn: () =>
  //     PostService.getPost({
  //       pageNo: 1,
  //       pageSize: 20,
  //       keyword: '',
  //       regionItems: [],
  //       categoryItems: [],
  //     }),
  // }),
  // detail: (postId: number) => ({
  //   queryKey: queryKeys.detail(postId),
  //   queryFn: () => PostService.getPostDetail(postId),
  // }),
  // comments: (postId: number) => ({
  //   queryKey: queryKeys.detailComments(postId),
  //   queryFn: () => PostService.getComments(postId),
  // }),
};

export default queryOptions;
