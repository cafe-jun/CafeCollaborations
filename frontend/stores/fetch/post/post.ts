import { customAxios, ErrorType } from "../customAxios";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import type { PostModel } from "../../model/post/post.model";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export const getPosts = () => {
  return customAxios<PostModel>({ url: `/v1/post`, method: "POST" });
};

// export const getPosts = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
//   mutation: UseMutationOptions<Awaited<ReturnType<typeof PostModel>,
//   TError,
//   void,
//   TContext,
// }) => {
//     console.log("first")
// };

export const getPostsQueryOption = <
  TData = Awaited<ReturnType<typeof getPosts>>,
  TError = ErrorType<unknown>
>(
  userID: string,
  params?: any,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getPosts>>,
      TError,
      TData
    >;
  }
) => {};
