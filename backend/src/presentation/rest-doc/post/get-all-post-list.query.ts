import { ApiProperty } from '@nestjs/swagger';

export class RestGetAllPostListQuery {
  @ApiProperty({ type: 'number', required: true, title: '페이지 사이즈' })
  pageSize: number;

  @ApiProperty({ type: 'number', required: true, title: '현재 페이지' })
  pageNo: number;

  @ApiProperty({ type: 'string', required: false, title: '검색 텍스트' })
  keyword: string;

  @ApiProperty({ type: 'array', required: false, title: '지역 코드' })
  regionItems: string[];

  @ApiProperty({ type: 'array', required: false, title: '카테고리 코드' })
  categoryItems: string[];
}
