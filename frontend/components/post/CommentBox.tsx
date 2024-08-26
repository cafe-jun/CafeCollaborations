// components/CommentBox.js
import { Box, Button, Input, Text, Flex, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';

const CommentBox = () => {
  const [comment, setComment] = useState('');
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

  return (
    <Box w="full" maxW="1000px" mx="auto" mt="6">
      <Text fontSize="x-large" fontWeight="bold">
        댓글 {comments.length}
      </Text>
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
