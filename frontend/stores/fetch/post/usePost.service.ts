import { useQuery } from '@tanstack/react-query';
import queryOptions from './queries';

export function usePost(query: {
  pageSize: number;
  pageNo: number;
  keyword: string;
  regionItems: string[];
  categoryItems: string[];
}) {
  return useQuery(
    queryOptions.all({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      keyword: query.keyword,
      regionItems: query.regionItems,
      categoryItems: query.categoryItems,
    })
  );
}

export function PostDetail({ postId }: { postId: number }) {
  return useQuery(queryOptions.detail(postId));
}
