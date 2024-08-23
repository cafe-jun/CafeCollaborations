import { Category } from '@core/common/enums/category.enum';
import { Duration } from '@core/common/enums/duration-type.enum';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { Region } from '@core/common/enums/region.enum';

export type CreatePostPort = {
  executorId: number;
  title: string;
  category: Category;
  imageId?: string;
  content?: string;
  region: Region;
  duration: Duration;
  recruitMember: RecruitMember;
  status?: PostStatus;
  publishedAt?: Date;
  removedAt?: Date;
  createdAt?: Date;
  editedAt?: Date;
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
  regionItems: string[];
  categoryItems: string[];
};
