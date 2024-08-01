"use client";

import {
  Box,
  Text,
  SimpleGrid,
  Badge,
  Flex,
  Input,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { usePost } from "@/stores/fetch/post/usePost.service";
import PostPagination from "./PostPagination";
import { useEffect, useState } from "react";
import PostMenu from "./PostMenu";
const geoItems = [
  { name: "경기", icon: "/path/to/react-icon.png" },
  { name: "서울", icon: "/path/to/typescript-icon.png" },
  { name: "강원", icon: "/path/to/javascript-icon.png" },
  { name: "충북", icon: "/path/to/vue-icon.png" },
  { name: "충남", icon: "/path/to/nextjs-icon.png" },
  { name: "전북", icon: "/path/to/nodejs-icon.png" },
  { name: "전남", icon: "/path/to/java-icon.png" },
  { name: "경북", icon: "/path/to/spring-icon.png" },
  { name: "경남", icon: "/path/to/kotlin-icon.png" },
  { name: "제주", icon: "/path/to/nestjs-icon.png" },
];

const categoryItems = [
  { name: "숙박", icon: "/path/to/react-icon.png" },
  { name: "먹거리", icon: "/path/to/typescript-icon.png" },
  { name: "패션", icon: "/path/to/javascript-icon.png" },
  { name: "뷰티", icon: "/path/to/vue-icon.png" },
  { name: "앱", icon: "/path/to/nextjs-icon.png" },
  { name: "생활용품", icon: "/path/to/nodejs-icon.png" },
  { name: "애견용품", icon: "/path/to/java-icon.png" },
];

export default function PostList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // ... 기존 코드 ...

  const handleMenuToggle = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  const handlePageChange = (item: { selected: number }) => {
    setCurrentPage(item.selected + 1);
  };

  const { data, refetch } = usePost({
    pageSize: 20,
    pageNo: currentPage,
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);
  if (!data?.data) return;

  return (
    <Box my={8}>
      <HStack marginBottom="3rem" justifyContent="space-between">
        <PostMenu
          title={"지역"}
          isOpen={openMenu === "업종"}
          onToggle={() => handleMenuToggle("업종")}
          items={geoItems}
        />
        <PostMenu
          title={"업종"}
          isOpen={openMenu === "지역"}
          onToggle={() => handleMenuToggle("지역")}
          items={categoryItems}
        />
        <Spacer />
        <Flex mb={4} alignItems="center" justifyContent="center">
          <Input
            placeholder="제목, 글 내용을 검색해보세요."
            size="lg"
            width="30rem"
          />
          <IconButton
            aria-label="search"
            icon={<SearchIcon />}
            ml={2}
            size="lg"
          />
        </Flex>
      </HStack>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
        {data?.data?.map((post, index) => (
          <Box
            key={index}
            width={"100%"}
            height={"18rem"}
            borderWidth={2}
            borderRadius="xl"
            p={4}
          >
            <Badge colorScheme="orange" mb={2}>
              체험단
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
        pageCount={data?.meta.totalPage ?? 0}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
