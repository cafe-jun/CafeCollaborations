"use client";

import {
  Box,
  Text,
  SimpleGrid,
  Badge,
  Flex,
  Button,
  Input,
  Select,
  HStack,
  IconButton,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { usePost } from "@/stores/fetch/post/usePost.service";
import PostPagination from "./PostPagination";
import { useEffect, useState } from "react";
export default function PostList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalItems = 114;
  const pageCount = Math.ceil(totalItems / 20);
  const handlePageChange = (item: { selected: number }) => {
    setCurrentPage(item.selected + 1);
  };

  const { data: posts, refetch } = usePost({
    pageSize: 20,
    pageNo: currentPage,
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);
  if (!posts) return;
  return (
    <Box my={8}>
      <HStack spacing={2} mb={4}>
        <Button variant="outline">전체</Button>
        <Button variant="outline">프로젝트</Button>
        <Button variant="outline">스터디</Button>
      </HStack>
      <Flex flexWrap="wrap" justifyContent="space-between" mb={4}>
        <HStack spacing={2} mb={2} flex={1} minW="200px">
          <Select placeholder="기술 스택" size="xs" borderRadius={"xl"}>
            {/* 옵션들 */}
          </Select>
          <Select placeholder="포지션" size="xs">
            {/* 옵션들 */}
          </Select>
          <Select placeholder="진행 방식" size="xs">
            {/* 옵션들 */}
          </Select>
        </HStack>
        <Button colorScheme="teal" size="sm" mb={2}>
          👍 내 맘대로 보기
        </Button>
      </Flex>
      <Flex mb={4}>
        <Input placeholder="제목, 글 내용을 검색해보세요." size="sm" />
        <IconButton
          aria-label="search"
          icon={<SearchIcon />}
          ml={2}
          size="sm"
        />
      </Flex>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
        {posts?.map((post, index) => (
          <Box
            key={index}
            width={"100%"}
            height={"18rem"}
            borderWidth={2}
            borderRadius="xl"
            p={4}
          >
            <Badge colorScheme="orange" mb={2}>
              프로젝트
            </Badge>
            <Text fontWeight="bold" mb={2} noOfLines={2}>
              {post.title}
            </Text>
            <Flex>
              {/* 태그 들어갈 자리 
               {post..map((skill, idx) => (
                <Badge key={idx} mr={1}>
                  {skill}
                </Badge>
              ))} */}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
      <PostPagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
