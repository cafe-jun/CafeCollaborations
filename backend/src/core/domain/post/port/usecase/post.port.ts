import { PostStatus } from '@core/common/enums/post-status.enum';
import { Region } from '@core/common/enums/region.enum';

export type CreatePostPort = {
  executorId: number;
  title: string;
  imageId?: string;
  content?: string;
  region: Region;
};

export type GetPostDetailPort = {
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
  keyword?: string;
};
