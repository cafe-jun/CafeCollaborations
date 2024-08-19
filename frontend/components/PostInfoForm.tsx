'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, VStack, Heading, SimpleGrid, Button } from '@chakra-ui/react';
import FormField from './FormField';
import ProjectDescriptionEditor from './PostDescription';
import {
  categoryFormOptions,
  durationTypeFormOptions,
  recruitMemberFormOptions,
  regionFormOptions,
} from './post/FormOptions';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import postService from '@/stores/fetch/post/post.service';
const ProjectInfoForm = () => {
  const formRef = useRef(null);
  const { data: session } = useSession();

  console.log('session :: ', session?.accessToken, session?.refreshToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    region: '',
    recruitMember: '',
    duration: '',
    category: '',
    title: '',
    content: '',
    imageId: 1,
  });

  const [openSelect, setOpenSelect] = useState(null);

  const fieldOptions = {
    category: categoryFormOptions,
    region: regionFormOptions,
    recruitMember: recruitMemberFormOptions,
    duration: durationTypeFormOptions,
  };

  const handleChange = (field) => (event) => {
    const options = fieldOptions[field];
    if (!options) return;

    const result = options.find((item) => item.value === event.target.value);
    if (!result) return;

    setFormData((prev) => ({ ...prev, [field]: result.value }));
  };

  const handleToggle = (fieldName) => {
    setOpenSelect((prev) => (prev === fieldName ? null : fieldName));
  };
  const onSubmit = async () => {
    await postService.createPost({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      duration: formData.duration,
      recruitMember: formData.recruitMember,
      region: formData.region,
      imageId: formData.imageId,
    });
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
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
            options={regionFormOptions}
            value={formData.region}
            onChange={handleChange('region')}
            placeholder="지역 선택"
            isOpen={openSelect === 'region'}
            onToggle={handleToggle}
            fieldName="region"
          />
          <FormField
            label="모집 인원"
            type="select"
            options={recruitMemberFormOptions}
            value={formData.recruitMember}
            onChange={handleChange('recruitMember')}
            placeholder="인원 선택"
            isOpen={openSelect === 'recruitMember'}
            onToggle={handleToggle}
            fieldName="recruitMember"
          />

          <FormField
            label="진행 기간"
            type="select"
            options={durationTypeFormOptions}
            value={formData.duration}
            onChange={handleChange('duration')}
            isOpen={openSelect === 'duration'}
            onToggle={handleToggle}
            placeholder="기간 선택"
            fieldName="duration"
          />
          <FormField
            label="업종 구분"
            type="select"
            options={categoryFormOptions}
            value={formData.category}
            onChange={handleChange('category')}
            isOpen={openSelect === 'category'}
            onToggle={handleToggle}
            placeholder="업종 선택"
            fieldName="category"
          />
        </SimpleGrid>

        {/* <ProjectDescriptionEditor /> */}
      </VStack>
    </Box>
  );
};

export default ProjectInfoForm;
