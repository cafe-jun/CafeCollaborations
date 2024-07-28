import { customAxios, ErrorType } from "../customAxios";
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type { GetPostQuery, PostModel } from "../../model/post/post.model";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export const getPosts = (query: {
  params?: GetPostQuery;
  signal?: AbortSignal;
}) => {
  return customAxios<PostModel>({
    url: `/v1/post`,
    method: "POST",
    params: query.params,
    signal: query.signal,
  });
};

export const useGetPosts = <
  TData = Awaited<ReturnType<typeof getPosts>>,
  TError = ErrorType<unknown>
>(
  params?: GetPostQuery,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getPosts>>,
      TError,
      TData
    >;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getPostsQueryOption({
    params,
    options,
  });
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  return query;
};

export const getPostsQueryOption = <
  TData = Awaited<ReturnType<typeof getPosts>>,
  TError = ErrorType<unknown>
>(query: {
  params?: GetPostQuery;
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getPosts>>,
      TError,
      TData
    >;
  };
}) => {
  const { query: queryOptions } = query.options ?? {};
  const queryKey = queryOptions?.queryKey;

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPosts>>> = ({
    signal,
  }) => getPosts({ params: query.params });

  return {
    queryKey,
    queryFn,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData> & {
    queryKey: QueryKey;
  };
};
