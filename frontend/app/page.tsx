"use client";

import NoticeBanner from "@/components/NoticeBanner";
import PopularPosts from "@/components/PopularPosts";
import PostList from "@/components/post/PostList";
import PostPagination from "@/components/post/PostPagination";
import { useState } from "react";

export default function Home() {
  return (
    <>
      {/* 서버 사이드 렌더링 & 서버 컴포넌트 */}
      <NoticeBanner />
      <PopularPosts />
      <PostList />
    </>
  );
}
