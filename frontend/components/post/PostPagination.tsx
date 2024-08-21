'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { PaginationContainer } from './styled';

export default function PostPagination({
  currentPage,
  pageCount,
  onPageChange,
}) {
  return (
    <Flex align="center" justify="center" my={4}>
      <PaginationContainer>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={onPageChange}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          previousClassName="page-item previous"
          nextClassName="page-item next"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          disabledClassName="disabled"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          previousLabel={<ChevronLeftIcon />}
          nextLabel={<ChevronRightIcon />}
        />
      </PaginationContainer>
    </Flex>
  );
}
