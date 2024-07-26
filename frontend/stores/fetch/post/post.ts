import { customAxios, ErrorType } from "../customAxios";
import { UseMutationOptions } from "@tanstack/react-query";
import type { PostModel } from "../../model/post/post.model";
type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export const postPosts = () => {
  return customAxios<void>({ url: `/v1/post`, method: "POST" });
};

export const getPosts = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation: UseMutationOptions<Awaited<ReturnType<typeof PostMo>>,
  TError,
  void,
  TContext,
}) => {};
