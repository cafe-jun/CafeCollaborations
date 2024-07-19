import { ApiProperty } from '@nestjs/swagger';

export class RestEditPostRequestPayload {
  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string', required: false })
  public imageId: number;

  @ApiProperty({ type: 'string', required: false })
  public content: string;
}
