import { PostStatus } from '@core/common/enums/post-status.enum';

export interface CreatePostPort {
  executorId: number;
  title: string;
  imageId?: string;
  content?: string;
}

export interface GetPostPort {
  executorId: number;
  postId: string;
}

export interface GetPostListPort {
  executorId: number;
  ownerId?: string;
  status?: PostStatus;
}

export interface EditPostPort {
  executorId: number;
  postId: string;
  title?: string;
  imageId?: string;
  content?: string;
}
