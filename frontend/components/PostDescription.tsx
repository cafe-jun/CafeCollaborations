import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Text, Input, Button, VStack } from "@chakra-ui/react";

const ProjectDescriptionEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleSubmit = () => {
    console.log({ title, content });
    // 여기에 제출 로직 추가
  };

  return (
    <VStack
      spacing={4}
      align="stretch"
      width="100%"
      maxWidth="800px"
      margin="auto"
    >
      <Text fontSize="xl" fontWeight="bold">
        모집 공고에 대해 작성해주세요
      </Text>

      <Box>
        <Text mb={2}>제목</Text>
        <Input
          placeholder="글 제목을 입력해주세요!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>

      <Box>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={setContent}
          placeholder="모집 정보에 대해 작성해주세요!"
          style={{ height: "450px" }}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" marginTop={"3rem"}>
        <Button mr={2} size={"lg"}>
          취소
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit} size={"lg"}>
          모집 등록
        </Button>
      </Box>
    </VStack>
  );
};

export default ProjectDescriptionEditor;
