import { ApiProperty } from '@nestjs/swagger';

export class RestGetPostListQuery {
  @ApiProperty({ type: 'number', required: false })
  public authorId: number;
}
