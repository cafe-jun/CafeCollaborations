import { CommentOwner } from '../comment-owner';

export type CreateCommentEntityPayload = {
  content: string;
  owner: CommentOwner;
  postId: number;
};
