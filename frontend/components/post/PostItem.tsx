import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function PostItem({ post, index }) {
  return (
    <Link href={`/${post.id}`} key={index}>
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
    </Link>
  );
}
