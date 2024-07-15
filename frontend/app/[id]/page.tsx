"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Flex,
  Tag,
  Link,
  Icon,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  CalendarIcon,
  TimeIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import PostInfo from "@/components/post/PostInfo";
import PostHeader from "@/components/post/PostHeader";
import PostContent from "@/components/post/PostContent";
import CommentSection from "@/components/post/CommentSection";

export default function PostPage() {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch" marginTop={"5rem"}>
        <PostHeader />
        <PostInfo />
        <PostContent />
        <CommentSection />
      </VStack>
    </Container>
  );
}
