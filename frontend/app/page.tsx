import { Container } from "@chakra-ui/react";
import Header from "@/components/Header";
import NoticeBanner from "@/components/NoticeBanner";
import PopularPosts from "@/components/PopularPosts";
import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <>
      <NoticeBanner />
      <PopularPosts />
      <ProjectList />
    </>
  );
}
