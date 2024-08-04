import { useQuery } from "@tanstack/react-query";
import queryOptions from "./queries";

export function usePost(query: {
  pageSize: number;
  pageNo: number;
  keyword: string;
}) {
  return useQuery(
    queryOptions.all({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      keyword: query.keyword,
    })
  );
}

export function useDetailPost({ postId }: { postId: number }) {
  return useQuery(queryOptions.detail(postId));
}

export function useComments({ postId }: { postId: number }) {
  return useQuery(queryOptions.comments(postId));
}
