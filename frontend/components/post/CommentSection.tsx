"use client";
import { Button, Heading, HStack, Input, VStack } from "@chakra-ui/react";

export default function CommentSection() {
  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">댓글 0</Heading>
      <HStack>
        <Input placeholder="댓글을 입력하세요." />
        <Button colorScheme="teal">댓글 등록</Button>
      </HStack>
    </VStack>
  );
}
