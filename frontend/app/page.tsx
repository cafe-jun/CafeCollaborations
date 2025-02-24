'use client';

import NoticeBanner from '@/components/banner/NoticeBanner';
import PopularPosts from '@/components/popular/PopularPosts';
import PostList from '@/components/post/PostList';
import PostPagination from '@/components/post/PostPagination';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Home() {
  const { data } = useSession();
  // console.log(data);
  return (
    <>
      {/* 서버 사이드 렌더링 & 서버 컴포넌트 */}
      <NoticeBanner />
      <PopularPosts />
      <PostList />
    </>
  );
}
