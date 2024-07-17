import { UserProvider } from '@core/common/enums/user-provider.enum';

export interface CreatePostPort {
  executorId: string;
  title: string;
  imageId?: string;
  content?: string;
}
