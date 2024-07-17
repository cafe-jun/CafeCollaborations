import { PostStatus } from '@core/common/enums/post-status.enum';

export interface CreatePostPort {
  executorId: string;
  title: string;
  imageId?: string;
  content?: string;
}

export interface GetPostPort {
  executorId: string;
  postId: string;
}

export interface GetPostListPort {
  executorId: string;
  ownerId?: string;
  status?: PostStatus;
}

export interface EditPostPort {
  executorId: string;
  postId: string;
  title?: string;
  imageId?: string;
  content?: string;
}
