"use client";

import { Box, Text, SimpleGrid, Badge, Flex } from "@chakra-ui/react";

export default function PopularPosts() {
  const posts = [
    {
      title: "[마켓플레이스 - BE/FE모집] 크립, 마켓플리, 현근 지원 선구마...",
      views: 1776,
      dDay: 15,
    },
    {
      title: "[BE/FE] 마켓플레이스 서비스원 청까지 끝이 하실 분 모집합니다.",
      views: 1233,
      dDay: 12,
    },
    {
      title:
        "[iOS/백엔드/디자이너] 팀 프로젝트 경험이 없는 사람들 모여라 ! ...",
      views: 970,
      dDay: 13,
    },
    {
      title: "대학생을 위한 스포츠 매칭 서비스 (앱 개발자 모집 ing)",
      views: 911,
      dDay: 9,
    },
  ];

  return (
    <Box my={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        🔥 이번주 체험단 인기글
      </Text>
      <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
        {posts.map((post, index) => (
          <Box key={index} borderWidth={1} borderRadius="lg" p={4}>
            <Badge colorScheme="orange" mb={2}>
              체험단
            </Badge>
            <Text fontWeight="bold" mb={2} noOfLines={2}>
              {post.title}
            </Text>
            <Flex justifyContent="space-between" fontSize="sm">
              <Text>조회수 {post.views}</Text>
              <Badge colorScheme="red">마감 {post.dDay}일전</Badge>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
