import { Text, VStack, HStack, Link, Icon } from "@chakra-ui/react";
import { CalendarIcon, TimeIcon, ChatIcon } from "@chakra-ui/icons";
import { useGetPosts } from "@/stores/fetch/post/post.back";

export default async function PostInfo() {
  const { data, refetch, isFetching } = useGetPosts();

  return (
    <HStack
      spacing={8}
      justify="space-between"
      bg="gray.50"
      p={4}
      borderRadius="md"
    >
      <VStack align="start" spacing={2}>
        <HStack>
          <Text fontWeight="bold">모집 구분:</Text>
          <Text>체험단</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">모집 인원:</Text>
          <Text>1명</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">연락 방법:</Text>
          <Link color="blue.500">오픈톡</Link>
        </HStack>
        <HStack>
          <Text fontWeight="bold">모집 분야:</Text>
          <Text>프론트엔드</Text>
        </HStack>
      </VStack>
      <VStack align="start" spacing={2}>
        <HStack>
          <ChatIcon />
          <Text>온/오프라인</Text>
        </HStack>
        <HStack>
          <Icon as={CalendarIcon} />
          <Text>2024.07.25</Text>
        </HStack>
        <HStack>
          <Icon as={TimeIcon} />
          <Text>3개월</Text>
        </HStack>
        <HStack>
          <Icon as={ChatIcon} />
          <Text>React</Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
