import { Nullable } from '@core/common/type/common.types';

export type ElasticPostPayload = {
  ownerid: number;
  owneremail: string;
  title: string;
  content?: Nullable<string>;
  duration: string;
  recruitMember: string;
  region: string;
  category: string;
  id?: number;
  status?: string;
  createdAt?: Date;
  editedAt?: Date;
  publishedAt?: Date;
  removedAt?: Date;
};
