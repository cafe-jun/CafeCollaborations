import { PostStatus } from '@core/common/enums/post-status.enum';

export type CreatePostPort = {
  executorId: number;
  title: string;
  imageId?: string;
  content?: string;
};

export type GetPostPort = {
  executorId: number;
  postId: number;
};

export type GetPostListPort = {
  executorId: number;
  ownerId?: number;
  status?: PostStatus;
};

export type EditPostPort = {
  executorId: number;
  postId: number;
  title?: string;
  imageId?: number;
  content?: string;
};

export type PublishPostPort = {
  executorId: number;
  postId: number;
};

export type RemovePostPort = {
  executorId: number;
  postId: number;
};

export type GetAllPostListPort = {
  pageNo: number;
  pageSize: number;
};
