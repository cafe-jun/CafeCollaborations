import { Box, Flex, FormControl, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FaCommentDots } from 'react-icons/fa';

type CommentFormType = {
  contents: string;
};

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <FormControl id="content">
      <Flex mt="4" align="center">
        <Box as={FaCommentDots} color="yellow.400" w="10" h="10" />
        <Textarea
          height="6.5rem"
          ml="2"
          placeholder="댓글을 입력하세요."
          value={comment}
          onChange={handleCommentChange}
          borderRadius={'20'}
          fontSize={'large'}
        />
      </Flex>
    </FormControl>
  );
};

export default CommentForm;
