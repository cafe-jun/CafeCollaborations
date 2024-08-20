'use client';

import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  SimpleGrid,
  Button,
  Text,
  Input,
  FormControl,
} from '@chakra-ui/react';
import {
  categoryFormOptions,
  durationTypeFormOptions,
  recruitMemberFormOptions,
  regionFormOptions,
} from './post/FormOptions';
import { useSession } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import postService from '@/stores/fetch/post/post.service';
import CustomSelect from './form/CustomSelect';
import InputField from './form/InputField';
import ReactQuill from 'react-quill';

type PostFormType = {
  region: string;
  recruitMember: string;
  duration: string;
  category: string;
  title: string;
  content: string;
  imageId: number;
};
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
  'image',
];

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
  ],
};

const ProjectInfoForm = () => {
  const formRef = useRef(null);
  const fieldOptions = {
    category: categoryFormOptions,
    region: regionFormOptions,
    recruitMember: recruitMemberFormOptions,
    duration: durationTypeFormOptions,
  };

  const { data: session } = useSession();

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormType>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      category: '',
      content: '',
      duration: '',
      imageId: 1,
      recruitMember: '',
      region: '',
    },
  });

  const [openSelect, setOpenSelect] = useState(null);

  const handleChange = (field) => (event) => {
    const options = fieldOptions[field];
    if (!options) return;

    const result = options.find((item) => item.value === event.target.value);
    if (!result) return;

    // setFormData((prev) => ({ ...prev, [field]: result.value }));
  };

  const handleToggle = (fieldName) => {
    setOpenSelect((prev) => (prev === fieldName ? null : fieldName));
  };
  const onSubmit = async (data) => {
    await postService.createPost({
      title: data.title,
      content: data.content,
      category: data.category,
      duration: data.duration,
      recruitMember: data.recruitMember,
      region: data.region,
      imageId: data.imageId,
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
          <CustomSelect
            label="지역 구분"
            options={regionFormOptions}
            onChange={handleChange('region')}
            placeholder="지역 선택"
            isOpen={openSelect === 'region'}
            onToggle={handleToggle}
            fieldName="region"
            props={register('region', { required: 'region is required' })}
          />
          <CustomSelect
            label="모집 인원"
            options={recruitMemberFormOptions}
            onChange={handleChange('recruitMember')}
            placeholder="인원 선택"
            isOpen={openSelect === 'recruitMember'}
            onToggle={handleToggle}
            fieldName="recruitMember"
            props={register('recruitMember', {
              required: 'recruitMember is required',
            })}
          />

          <CustomSelect
            label="진행 기간"
            options={durationTypeFormOptions}
            onChange={handleChange('duration')}
            isOpen={openSelect === 'duration'}
            onToggle={handleToggle}
            placeholder="기간 선택"
            fieldName="duration"
            props={register('duration', { required: 'duration is required' })}
          />
          <CustomSelect
            label="업종 구분"
            options={categoryFormOptions}
            onChange={handleChange('category')}
            isOpen={openSelect === 'category'}
            onToggle={handleToggle}
            placeholder="업종 선택"
            fieldName="category"
            props={register('category', { required: 'category is required' })}
          />
        </SimpleGrid>
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
            <InputField
              fieldName={'title'}
              props={register('title', { required: 'title is required' })}
            />
          </Box>

          <Box>
            <FormControl id="content">
              <Controller
                name="content"
                control={control}
                rules={{ required: 'Content is required' }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    style={{ height: '450px' }}
                    onChange={(content) => field.onChange(content)}
                  />
                )}
              />
            </FormControl>
          </Box>

          <Box display="flex" justifyContent="flex-end" marginTop={'3rem'}>
            <Button mr={2} size={'lg'}>
              취소
            </Button>
            <Button colorScheme="blue" type="submit" size={'lg'}>
              모집 등록
            </Button>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ProjectInfoForm;
