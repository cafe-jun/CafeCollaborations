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
        <Button onClick={onOpen}>로그인</Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="xl" maxWidth="400px">
          <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
            HOLA
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Text textAlign="center" fontWeight="bold" fontSize="lg">
                Hola에 오신 것을 환영합니다!
              </Text>
              <Text textAlign="center" fontSize="sm" color="gray.600">
                스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법! Hola에서 함께 할
                팀원들을 찾으세요
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
