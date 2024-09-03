'use client';

import { useRouter } from 'next/router';
import CommentBox from './CommentBox';

export default function CommentSection({ postId }: { postId: number }) {
  return (
    <div>
      <CommentBox postId={postId} />
    </div>
  );
}
