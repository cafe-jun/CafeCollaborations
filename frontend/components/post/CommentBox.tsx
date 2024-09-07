// components/CommentBox.js
import { Box, Text, HStack, Avatar, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { useComments } from '@/stores/fetch/comment/useComment.hook';
import dayjs from 'dayjs';
import PostPagination from './PostPagination';

const CommentBox = ({ postId }: { postId: number }) => {
  const [comment, setComment] = useState('');

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment) {
    }
  };

  const { data, refetch } = useComments({
    pageNo: currentPage || 1,
    pageSize: 5,
    postId,
  });

  const handleSearchKeyword = () => {
    refetch();
  };

  const handlePageChange = (item: { selected: number }) => {
    setCurrentPage(item.selected + 1);
  };
  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  return (
    <Box w="full" maxW="1000px" mx="auto" mt="6">
      <Text fontSize="x-large" fontWeight="bold">
        댓글 {data?.data.length}
      </Text>
      <CommentForm postId={postId} refech={refetch} />

      <VStack spacing="4" align="stretch" mt="6">
        {data?.data.map((comment, idx) => (
          <Box key={idx} p="4" borderRadius="md">
            <HStack spacing="4" align="start">
              <Avatar size="sm" name={comment['owner'].name} />
              <Box flex="1">
                <HStack justify="space-between" mb="2">
                  <Text fontWeight="bold">{comment['owner'].name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </HStack>
                <Text>{comment.content}</Text>
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
      <PostPagination
        currentPage={currentPage}
        pageCount={data?.meta.totalPage ?? 0}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default CommentBox;
