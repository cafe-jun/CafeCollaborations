import { Nullable } from '@core/common/type/common.types';
import { PostImage } from '../post-image';

export type EditPostEntityPayload = {
  title?: string;
  image?: Nullable<PostImage>;
  content?: Nullable<string>;
};
