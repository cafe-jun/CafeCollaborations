import { Box, Heading, HStack, Tag, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
export default function PostHeader({
  title,
  tag = '체험단',
  createdAt = '2024.07.11',
}) {
  return (
    <Box>
      <Heading as="h2" size="2xl">
        {title}
      </Heading>
      <HStack spacing={4} mt={2}>
        <Tag size="lg" variant="outline">
          {tag}
        </Tag>
        <Text color="gray.500">
          {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
        </Text>
      </HStack>
    </Box>
  );
}
