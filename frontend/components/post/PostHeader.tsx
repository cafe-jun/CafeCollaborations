import { Box, Heading, HStack, Tag, Text } from "@chakra-ui/react";

export default function PostHeader({
  title,
  tag = "체험단",
  createdAt = "2024.07.11",
}) {
  return (
    <Box>
      <Heading as="h2" size="2xl">
        {title}
      </Heading>
      <HStack spacing={4} mt={2}>
        <Tag size="sm" variant="outline">
          {tag}
        </Tag>
        <Text color="gray.500">{createdAt}</Text>
      </HStack>
    </Box>
  );
}
