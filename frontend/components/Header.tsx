"use client";

import { Flex, Box, Button, Spacer, Container } from "@chakra-ui/react";
import LoginModal from "./LoginModal";

export default function Header() {
  return (
    <Box borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.xl">
        <Flex alignItems="center" py={4}>
          <Box fontWeight="bold" fontSize="xl">
            HOLA
          </Box>
          <Box ml={4}>Hola-IT</Box>
          <Spacer />
          <Button colorScheme="teal" size="sm" mr={2}>
            팀원 모집하기
          </Button>
          <Button variant="ghost" size="sm" mr={2}>
            비즈니스 문의
          </Button>
          <LoginModal />
        </Flex>
      </Container>
    </Box>
  );
}
