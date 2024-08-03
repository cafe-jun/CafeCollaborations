import { Nullable } from '@core/common/type/common.types';
import { PostOwner } from '../post-owner';
import { PostImage } from '../post-image';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { Region } from '@core/common/enums/region.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { DurationType } from '@core/common/enums/duration-type.enum';
import { Category } from '@core/common/enums/category.enum';

export type CreatePostEntityPayload = {
  owner: PostOwner;
  title: string;
  image?: Nullable<PostImage>;
  content?: Nullable<string>;
  durationType: DurationType;
  recruitMember: RecruitMember;
  region: Region;
  category: Category;
  id?: number;
  status?: PostStatus;
  createdAt?: Date;
  editedAt?: Date;
  publishedAt?: Date;
  removedAt?: Date;
};
