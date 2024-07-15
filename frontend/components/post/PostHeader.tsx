import { Box, Heading, HStack, Tag, Text } from "@chakra-ui/react";

export default async function PostHeader() {
  return (
    <Box>
      <Heading as="h2" size="2xl">
        GGB와 함께 할 프론트 한 분!
      </Heading>
      <HStack spacing={4} mt={2}>
        <Tag size="sm" variant="outline">
          프랭우
        </Tag>
        <Text color="gray.500">2024.07.11</Text>
      </HStack>
    </Box>
  );
}
