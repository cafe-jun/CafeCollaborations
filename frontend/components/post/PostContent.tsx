import { Box, Heading, Link, Text } from "@chakra-ui/react";

export default function PostContent({ title, content }) {
  return (
    <Box>
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
        {content}
      </Text>
    </Box>
  );
}
