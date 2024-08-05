"use client";

import { useEffect, useRef, useState } from "react";
import { Box, VStack, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import FormField from "./FormField";
import ProjectDescriptionEditor from "./PostDescription";

const ProjectInfoForm = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    recruitmentType: "",
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
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (fieldName) => {
    setOpenSelect((prev) => (prev === fieldName ? null : fieldName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(event);
      // if (formRef.current && !formRef.current.contains(event.target)) {
      //   setOpenSelect(null);
      // }
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
            label="모집 구분"
            type="select"
            options={["스터디", "프로젝트"]}
            value={formData.recruitmentType}
            onChange={handleChange("recruitmentType")}
            placeholder="스터디/프로젝트"
            isOpen={openSelect === "recruitmentType"}
            onToggle={handleToggle}
            fieldName="recruitmentType"
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
          {/* 다른 필드들도 비슷한 방식으로 구현 */}
          <FormField
            label="진행 방식"
            type="select"
            options={["온라인", "오프라인", "온/오프라인 병행"]}
            value={formData.progressMethod}
            onChange={handleChange("progressMethod")}
            placeholder="온라인/오프라인"
            isOpen={openSelect === "progressMethod"}
            onToggle={handleToggle}
            fieldName="progressMethod"
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
            label="기술 스택"
            type="select"
            options={[
              "React",
              "Vue",
              "Angular",
              "Node.js",
              "Python",
              "Java",
              "기타",
            ]}
            value={formData.techStack}
            onChange={handleChange("techStack")}
            isOpen={openSelect === "techStack"}
            onToggle={handleToggle}
            placeholder="프로젝트 사용 스택"
            fieldName="techStack"
          />
          {/* <FormField
            label="모집 마감일"
            type="date"
            value={formData.deadline}
            onChange={handleChange("deadline")}
            isOpen={openSelect === "deadline"}
            onToggle={handleToggle}
            fieldName="deadline"
          /> */}
          <FormField
            label="모집 포지션"
            type="select"
            options={[
              "프론트엔드",
              "백엔드",
              "풀스택",
              "디자이너",
              "기획자",
              "PM",
            ]}
            value={formData.positions}
            onChange={handleChange("positions")}
            placeholder="프론트엔드, 백엔드..."
            isOpen={openSelect === "positions"}
            onToggle={handleToggle}
            fieldName="positions"
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
