"use client";

import {
  Box,
  Text,
  SimpleGrid,
  Badge,
  Flex,
  Button,
  Input,
  HStack,
  IconButton,
  WrapItem,
  Wrap,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverBody,
  VStack,
  Checkbox,
} from "@chakra-ui/react";

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { usePost } from "@/stores/fetch/post/usePost.service";
import PostPagination from "./PostPagination";
import { useEffect, useState } from "react";
import PostMenu from "./PostMenu";
const technologies = [
  { name: "React", icon: "/path/to/react-icon.png" },
  { name: "TypeScript", icon: "/path/to/typescript-icon.png" },
  { name: "JavaScript", icon: "/path/to/javascript-icon.png" },
  { name: "Vue", icon: "/path/to/vue-icon.png" },
  { name: "Next.js", icon: "/path/to/nextjs-icon.png" },
  { name: "Node.js", icon: "/path/to/nodejs-icon.png" },
  { name: "Java", icon: "/path/to/java-icon.png" },
  { name: "Spring", icon: "/path/to/spring-icon.png" },
  { name: "Kotlin", icon: "/path/to/kotlin-icon.png" },
  { name: "Nest.js", icon: "/path/to/nestjs-icon.png" },
  { name: "Swift", icon: "/path/to/swift-icon.png" },
  { name: "Flutter", icon: "/path/to/flutter-icon.png" },
  { name: "Figma", icon: "/path/to/figma-icon.png" },
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
        />
        <PostMenu
          title={"업종"}
          isOpen={openMenu === "지역"}
          onToggle={() => handleMenuToggle("지역")}
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
        pageCount={data?.meta.totalPage ?? 0}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
