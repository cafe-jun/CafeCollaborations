import { Box, Button, Flex, FormControl, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import commentService from '@/stores/fetch/comment/comment.service';

import { FaCommentDots } from 'react-icons/fa';
import { useRouter } from 'next/router';

type CommentFormType = {
  contents: string;
};

const CommentForm = ({ postId, refech }: { postId: number; refech }) => {
  const [content, setContent] = useState('');

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormType>({
    mode: 'onSubmit',
    defaultValues: {
      contents: '',
    },
  });

  const onSubmit = async (data) => {
    await commentService.createComment({
      content,
      postId,
    });
    setContent('');
    refech();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="content">
        <Flex mt="4" align="center">
          <Box as={FaCommentDots} color="yellow.400" w="10" h="10" />
          <Textarea
            height="6.5rem"
            ml="2"
            placeholder="댓글을 입력하세요."
            value={content}
            borderRadius={'20'}
            onChange={(e) => setContent(e.target.value)}
            fontSize={'large'}
          />
        </Flex>
      </FormControl>
      <Flex justifyContent={'end'}>
        <Button type="submit" colorScheme="blackAlpha" margin="2rem">
          댓글 등록
        </Button>
      </Flex>
    </form>
  );
};

export default CommentForm;
