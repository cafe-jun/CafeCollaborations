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
import { useGetPosts } from "@/stores/fetch/post/post";
export default function ProjectList() {
  const { data, refetch, isFetching } = useGetPosts({
    pageNo: 1,
    pageSize: 5,
  });
  console.log(data);
  const projects = [
    {
      title: "[PM 모집] 사이드 프로젝트<🤟, 자...?>의 PM을 모집합니다!",
      category: "PM",
      skills: ["기획자", "마케터"],
    },
    {
      title: "프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!",
      category: "디자이너",
      skills: [],
    },
    {
      title: "영어학습앱-PM, UX UI기획 모집",
      category: "PM",
      skills: ["기획자"],
    },
    {
      title: "앱 모 앱 프로젝트 디자이너 모집",
      category: "디자이너",
      skills: [],
    },
    {
      title: "프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!",
      category: "디자이너",
      skills: [],
    },
    {
      title: "영어학습앱-PM, UX UI기획 모집",
      category: "PM",
      skills: ["기획자"],
    },
    {
      title: "앱 모 앱 프로젝트 디자이너 모집",
      category: "디자이너",
      skills: [],
    },
  ];

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
        {projects.map((project, index) => (
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
              {project.title}
            </Text>
            <Flex>
              {project.skills.map((skill, idx) => (
                <Badge key={idx} mr={1}>
                  {skill}
                </Badge>
              ))}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
