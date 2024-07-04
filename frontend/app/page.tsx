import { Container } from "@chakra-ui/react";
import Header from "@/components/Header";
import NoticeBanner from "@/components/NoticeBanner";
import PopularPosts from "@/components/PopularPosts";
import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <>
      <Header />
      <Container maxW="1440px" px={[4, 6, 8]}>
        <NoticeBanner />
        <PopularPosts />
        <ProjectList />
      </Container>
    </>
  );
}
