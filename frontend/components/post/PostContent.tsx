import { Box, Heading, Link, Text } from "@chakra-ui/react";

export default async function PostContent() {
  return (
    <Box>
      <Heading as="h3" size="xl" mb={4}>
        프로젝트 소개
      </Heading>
      <Text fontSize={"large"}>
        지원 링크입니다!
        <Link
          color="blue.500"
          href="https://open.kakao.com/o/sPEDDxzg"
          isExternal
        >
          https://open.kakao.com/o/sPEDDxzg
        </Link>
      </Text>
      <Text fontSize={"large"} mt={4}>
        학부 시절 흥업과 함께 만들었고 버려졌던 졸업작품, 이러한 졸업 작품을
        활용할 수는 없을까? 라는 생각과 함께 시작한 GGB 프로젝트 상세한 내용은
        글에서 작성할 수 없지만 유저등이 확실한 서비스입니다!
      </Text>
      {/* 추가 내용 */}
    </Box>
  );
}
