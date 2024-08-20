'use client';

import {
  Box,
  Text,
  SimpleGrid,
  Badge,
  Flex,
  Input,
  HStack,
  IconButton,
  Spacer,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';
import { usePost } from '@/stores/fetch/post/usePost.service';
import PostPagination from './PostPagination';
import { useEffect, useState } from 'react';
import PostMenu from './PostMenu';
import PostItem from './PostItem';

export const regionItems = [
  { name: '경기', code: 'RE1000' },
  { name: '서울', code: 'RE1001' },
  { name: '강원', code: 'RE1002' },
  { name: '충북', code: 'RE1003' },
  { name: '충남', code: 'RE1004' },
  { name: '전북', code: 'RE1005' },
  { name: '전남', code: 'RE1006' },
  { name: '경북', code: 'RE1007' },
  { name: '경남', code: 'RE1008' },
  { name: '제주', code: 'RE1009' },
];

export const categoryItems = [
  { name: '숙박', code: 'CA1000' },
  { name: '먹거리', code: 'CA1001' },
  { name: '패션', code: 'CA1002' },
  { name: '뷰티', code: 'CA1003' },
  { name: '앱', code: 'CA1004' },
  { name: '생활용품', code: 'CA1005' },
  { name: '애견용품', code: 'CA1006' },
];

export default function PostList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleSearchKeyworkd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleMenuToggle = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  const handlePageChange = (item: { selected: number }) => {
    setCurrentPage(item.selected + 1);
  };

  const { data, refetch } = usePost({
    pageSize: 20,
    pageNo: currentPage,
    keyword: searchKeyword,
  });

  const handleSearchKeyword = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);
  if (!data?.data) return;

  return (
    <Box my={8}>
      <HStack marginBottom="3rem" justifyContent="space-between">
        <PostMenu
          title={'지역'}
          isOpen={openMenu === '업종'}
          onToggle={() => handleMenuToggle('업종')}
          items={regionItems}
        />
        <PostMenu
          title={'업종'}
          isOpen={openMenu === '지역'}
          onToggle={() => handleMenuToggle('지역')}
          items={categoryItems}
        />
        <Spacer />
        <Flex mb={4} alignItems="center" justifyContent="center">
          <Input
            placeholder="제목, 글 내용을 검색해보세요."
            size="lg"
            width="30rem"
            value={searchKeyword}
            onChange={handleSearchKeyworkd}
          />
          <IconButton
            aria-label="search"
            icon={<SearchIcon />}
            ml={2}
            size="lg"
            onClick={handleSearchKeyword}
          />
        </Flex>
      </HStack>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
        {data?.data?.map((post, index) => (
          <PostItem key={index} post={post} index={index} />
        ))}
      </SimpleGrid>
      <PostPagination
        currentPage={currentPage}
        pageCount={data?.meta.totalPage ?? 0}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
