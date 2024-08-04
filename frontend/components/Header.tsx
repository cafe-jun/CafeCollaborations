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
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  const onRegisterLinkClick = () => {
    router.push("/register");
  };
  return (
    <Box borderBottom="1px" borderColor="gray.200" bg="white">
      <Container maxW="1400">
        <Flex
          py={4}
          alignItems="center"
          justifyContent="space-between"
          marginLeft={"1rem"}
        >
          <Flex alignItems="center">
            <Link href="/">
              <Text fontWeight="bold" fontSize="2xl" mr={4}>
                CafeCollaboartion
              </Text>
            </Link>
            <Text>사장이랑 블로거랑</Text>
          </Flex>
          <Spacer />
          <div>
            <Button
              borderRadius="lg"
              height={"3.5rem"}
              width={"9rem"}
              onClick={() => onRegisterLinkClick()}
              backgroundColor={"teal.100"}
              marginRight={"3rem"}
            >
              체험단 모집하기
            </Button>
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
          </div>
        </Flex>
      </Container>
    </Box>
  );
}
