"use client";

import { useEffect, useRef, useState } from "react";
import { Box, VStack, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import FormField from "./FormField";
import ProjectDescriptionEditor from "./PostDescription";
import { categoryItems, regionItems } from "./post/PostList";

const ProjectInfoForm = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    regionType: "",
    memberCount: "",
    progressMethod: "",
    duration: "",
    techStack: "",
    deadline: "",
    positions: "",
    contactMethod: "",
  });

  const [openSelect, setOpenSelect] = useState(null);

  const handleChange = (field) => (value) => {
    if (field === "techStack") {
      return;
    }
    if (field === "region") {
      const result = regionItems.find((item) => item.name === value);
      if (!result) return;
      setFormData((prev) => ({ ...prev, [field]: result?.code }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (fieldName) => {
    setOpenSelect((prev) => (prev === fieldName ? null : fieldName));
  };

  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent) => {
      console.log(event);

      if (formRef.current) {
        setOpenSelect(null);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // 폼 제출 로직
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxWidth="800px"
      margin="auto"
      padding={6}
    >
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="lg">
          모집 기본 정보를 입력해주세요.
        </Heading>

        <SimpleGrid columns={2} spacing={6}>
          <FormField
            label="지역 구분"
            type="select"
            options={regionItems.map((item) => item.name)}
            value={formData.regionType}
            onChange={handleChange("region")}
            placeholder="모집 지역"
            isOpen={openSelect === "region"}
            onToggle={handleToggle}
            fieldName="regionType"
          />
          <FormField
            label="모집 인원"
            type="select"
            options={["인원 미정", "1~5명", "6~10명", "10명 이상"]}
            value={formData.memberCount}
            onChange={handleChange("memberCount")}
            placeholder="인원 미정~10명 이상"
            isOpen={openSelect === "memberCount"}
            onToggle={handleToggle}
            fieldName="memberCount"
          />

          <FormField
            label="진행 기간"
            type="select"
            options={[
              "기간 미정",
              "1개월 미만",
              "1~3개월",
              "3~6개월",
              "6개월 이상",
            ]}
            value={formData.duration}
            onChange={handleChange("duration")}
            isOpen={openSelect === "duration"}
            onToggle={handleToggle}
            placeholder="기간 미정~6개월 이상"
            fieldName="duration"
          />
          <FormField
            label="업종 구분"
            type="select"
            options={categoryItems.map((item) => item.name)}
            value={formData.techStack}
            onChange={handleChange("techStack")}
            isOpen={openSelect === "techStack"}
            onToggle={handleToggle}
            placeholder="모집 업종"
            fieldName="techStack"
          />
          <FormField
            label="연락 방법"
            type="select"
            options={["카카오톡 오픈채팅", "이메일", "구글 폼", "기타"]}
            value={formData.contactMethod}
            onChange={handleChange("contactMethod")}
            placeholder="카카오톡 오픈채팅"
            isOpen={openSelect === "contactMethod"}
            onToggle={handleToggle}
            fieldName="contactMethod"
          />
        </SimpleGrid>

        <ProjectDescriptionEditor />
      </VStack>
    </Box>
  );
};

export default ProjectInfoForm;
