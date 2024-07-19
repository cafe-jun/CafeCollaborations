import { ApiProperty } from '@nestjs/swagger';

export class RestCreatePostRequestPayload {
  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string', required: false })
  public imageId: string;

  @ApiProperty({ type: 'string', required: false })
  public content: string;
}
