import { ApiProperty } from '@nestjs/swagger';

export class RestCreateCommentRequestPayload {
  @ApiProperty({ type: 'string', description: '댓글정보' })
  public content: string;
}
