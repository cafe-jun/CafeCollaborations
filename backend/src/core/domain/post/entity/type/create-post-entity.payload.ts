import { Nullable } from '@core/common/type/common.types';
import { PostOwner } from '../post-owner';
import { PostImage } from '../post-image';
import { PostStatus } from '@core/common/enums/post-status.enum';

export type CreatePostEntityPayload = {
  owner: PostOwner;
  title: string;
  image?: Nullable<PostImage>;
  content?: Nullable<string>;
  id?: string;
  status?: PostStatus;
  createdAt?: Date;
  editedAt?: Date;
  publishedAt?: Date;
  removedAt?: Date;
};
