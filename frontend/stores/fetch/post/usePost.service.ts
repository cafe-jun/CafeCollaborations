import { useQuery } from "@tanstack/react-query";
import queryOptions from "./queries";

export function usePost(query: { pageSize: number; pageNo: number }) {
  return useQuery(
    queryOptions.all({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    })
  );
}

export function usePhoto({ postId }: { postId: number }) {
  return useQuery(queryOptions.detail(postId));
}

export function useComments({ postId }: { postId: number }) {
  return useQuery(queryOptions.comments(postId));
}
