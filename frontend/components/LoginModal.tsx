"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  useDisclosure,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

export default function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div>
          <Text>{session.user?.name}</Text>
          <Button>로그아웃</Button>
        </div>
      ) : (
        <Button
          borderRadius="lg"
          height={"3.5rem"}
          width={"7rem"}
          onClick={onOpen}
        >
          로그인
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="xl" maxWidth="400px">
          <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
            CafeCollaboartion
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Text textAlign="center" fontSize="sm" color="gray.600">
                홍보를 위한 블로거들을 찾는 가장 쉬운 방법! CafeCollaboartion
                에서 찾아보세요
              </Text>
              <Button
                leftIcon={<FaGoogle />}
                variant="outline"
                colorScheme="gray"
                size="lg"
                onClick={() => signIn("google")}
              >
                Google 로그인
              </Button>
              <Button
                leftIcon={<SiNaver />}
                bg="#01C75A"
                color="white"
                _hover={{ bg: "#01C75A" }}
                size="lg"
                onClick={() => signIn("naver")}
              >
                Naver 로그인
              </Button>
              <Button
                leftIcon={<RiKakaoTalkFill />}
                bg="#FEE500"
                color="black"
                _hover={{ bg: "#FDD835" }}
                size="lg"
                onClick={() => signIn("kakao")}
              >
                Kakao 로그인
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
