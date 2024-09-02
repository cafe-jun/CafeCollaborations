import { useQuery } from '@tanstack/react-query';
import queryOptions from './queries';

export function useComments(query: {
  pageSize: number;
  pageNo: number;
  postId: number;
}) {
  return useQuery(
    queryOptions.all({
      postId: query.postId,
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    })
  );
}
