'use client';

import { Container, VStack } from '@chakra-ui/react';

import PostInfo from '@/components/post/PostInfo';
import PostHeader from '@/components/post/PostHeader';
import PostContent from '@/components/post/PostContent';
import CommentSection from '@/components/post/CommentSection';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PostDetail } from '@/stores/fetch/post/usePost.service';

export function fetchPost(payload: { postId: number }) {
  const { data, refetch, isFetching } = PostDetail({
    postId: payload.postId,
  });

  return { data, refetch, isFetching };
}

export default function PostPage() {
  const pathname = usePathname();
  const postId = Number(pathname.split('/')[1]);
  const { data, refetch, isFetching } = fetchPost({
    postId,
  });

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch" marginTop={'5rem'}>
        <PostHeader
          title={data?.title}
          tag={'체험단'}
          createdAt={data?.createdAt}
        />
        <PostInfo
          category={data?.category}
          duration={data?.duration}
          recruitMember={data?.recruitMember}
          region={data?.region}
        />
        <PostContent title={data?.title} content={data?.content} />
        <CommentSection />
      </VStack>
    </Container>
  );
}
