"use client";

import React from "react";
import { Box, Text, Flex, Container, Badge } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerItems = [
  {
    title: "스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법",
    description: "올라에서 함께할 팀원들을 찾으세요🔍",
    image: "/hand-image.png", // 실제 이미지 경로로 변경해주세요
  },
  {
    title: "스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법2",
    description: "올라에서 함께할 팀원들을 찾으세요2🔍",
    image: "/hand-image.png", // 실제 이미지 경로로 변경해주세요
  },
  {
    title: "스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법3",
    description: "올라에서 함께할 팀원들을 찾으세요3🔍",
    image: "/hand-image.png", // 실제 이미지 경로로 변경해주세요
  },
];

export default function NoticeBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box bg="green.50" py={8}>
      <Container maxW="1600px">
        <Slider {...settings}>
          {bannerItems.map((item, index) => (
            <Box
              key={`${item.title}-${index}`}
              position="relative"
              height="350px"
            >
              <Flex
                direction="column"
                maxWidth="80%"
                height="100%"
                justifyContent="center"
              >
                <Badge colorScheme="teal" alignSelf="flex-start" mb={2}>
                  NOTICE
                </Badge>
                <Text fontWeight="bold" fontSize="2xl" mb={2}>
                  {item.title}
                </Text>
                <Text fontSize="md">{item.description}</Text>
              </Flex>
              <Box
                position="absolute"
                right="20px"
                top="50%"
                transform="translateY(-50%)"
                width="200px"
                height="200px"
                backgroundImage={`url(${item.image})`}
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
              />
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}
