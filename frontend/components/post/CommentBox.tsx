// components/CommentBox.js
import { Box, Button, Input, Text, Flex, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import CommentForm from './CommentForm';
import { useComments } from '@/stores/fetch/comment/useComment.hook';

const CommentBox = () => {
  const [comment, setComment] = useState('');

  const [currentPage, setCurrentPage] = useState();

  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // setComments([...comments, comment]);
      setComment('');
    }
  };

  const { data, refetch } = useComments({
    pageNo: 1,
    pageSize: 10,
    postId: 7,
  });

  const handleSearchKeyword = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  return (
    <Box w="full" maxW="1000px" mx="auto" mt="6">
      <Text fontSize="x-large" fontWeight="bold">
        댓글 {comments.length}
      </Text>
      <CommentForm />
      <Flex justifyContent={'end'}>
        <Button
          onClick={handleCommentSubmit}
          colorScheme="blackAlpha"
          margin="2rem"
        >
          댓글 등록
        </Button>
      </Flex>
      <Box mt="4">
        {comments.map((cmt, idx) => (
          <Text
            key={idx}
            mt="2"
            borderBottom="1px"
            borderColor="gray.200"
            pb="2"
          >
            {cmt}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default CommentBox;
