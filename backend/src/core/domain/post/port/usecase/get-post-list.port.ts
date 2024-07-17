import { PostStatus } from '@core/common/enums/post-status.enum';

export interface GetPostListPort {
  executorId: string;
  ownerId?: string;
  status?: PostStatus;
}
