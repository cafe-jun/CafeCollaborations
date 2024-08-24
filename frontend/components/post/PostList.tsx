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
import { categoryOptions, regionOptions } from './FormOptions';
import { isEmpty } from '../../util/loadash';

export default function PostList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const [regionItems, setRegionItems] = useState<string[]>([]);

  const [categoryItems, setCategoryItems] = useState<string[]>([]);

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
    regionItems: regionItems,
    categoryItems: categoryItems,
  });

  const handleSearchKeyword = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    refetch();
  }, [regionItems, categoryItems]);

  if (!data?.data) return;

  return (
    <Box my={8}>
      <HStack marginBottom="3rem" justifyContent="space-between">
        <PostMenu
          title={'지역'}
          isOpen={openMenu === '업종'}
          onToggle={() => handleMenuToggle('업종')}
          items={regionOptions}
          itemsValue={regionItems}
          setItemsValue={setRegionItems}
        />
        <PostMenu
          title={'업종'}
          isOpen={openMenu === '지역'}
          onToggle={() => handleMenuToggle('지역')}
          items={categoryOptions}
          itemsValue={categoryItems}
          setItemsValue={setCategoryItems}
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
        {data.data.length === 0 ? (
          <Text>업종의 장치가 없습니다.</Text>
        ) : (
          data?.data?.map((post, index) => (
            <PostItem key={index} post={post} index={index} />
          ))
        )}
      </SimpleGrid>
      <PostPagination
        currentPage={currentPage}
        pageCount={data?.meta.totalPage ?? 0}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
