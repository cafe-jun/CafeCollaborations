"use client";

import { Box, Text, Flex, Image } from "@chakra-ui/react";

export default function NoticeBanner() {
  return (
    <Box
      bg="blue.50"
      borderRadius="lg"
      my={8}
      p={6}
      position="relative"
      overflow="hidden"
    >
      <Flex direction="column" maxWidth="70%">
        <Text fontWeight="bold" fontSize="sm" color="blue.400" mb={2}>
          NOTICE
        </Text>
        <Text fontWeight="bold" fontSize={["xl", "2xl"]} mb={2}>
          IT 행사 정보도 Hola에서!
        </Text>
        <Text>공모전, 컨퍼런스, 해커톤, 부트캠프까지 한번에👌</Text>
      </Flex>
      <Image
        src="/chat-bubbles.png" // 실제 이미지 경로로 변경해야 합니다
        position="absolute"
        right="20px"
        top="50%"
        transform="translateY(-50%)"
        width="100px"
        display={["none", "block"]}
      />
    </Box>
  );
}
