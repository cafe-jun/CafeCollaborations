"use client";

import {
  Flex,
  Box,
  Button,
  Spacer,
  Container,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Text,
} from "@chakra-ui/react";
import LoginModal from "./LoginModal";
import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
export default function Header() {
  const { data: session } = useSession();
  return (
    <Box borderBottom="1px" borderColor="gray.200" bg="white">
      <Container maxW="1400">
        <Flex py={4} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Text fontWeight="bold" fontSize="2xl" mr={4}>
              CafeCollaboartion
            </Text>
            <Text>사장이랑 블로거랑</Text>
          </Flex>

          {session ? (
            <Flex alignItems="center">
              <IconButton
                icon={<BellIcon />}
                variant="ghost"
                size="md"
                mr={4}
                aria-label="Notifications"
              />
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="ghost"
                >
                  <Avatar
                    size="sm"
                    name={session.user?.name || "test"}
                    src={session.user?.image || "test"}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>내 작성글</MenuItem>
                  <MenuItem>내 관심글</MenuItem>
                  <MenuItem>설정</MenuItem>
                  <MenuItem onClick={() => signOut()}>로그아웃</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <LoginModal />
          )}
        </Flex>
      </Container>
    </Box>
  );
}
