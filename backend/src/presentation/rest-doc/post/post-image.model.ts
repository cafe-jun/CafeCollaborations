import { ApiProperty } from '@nestjs/swagger';

export class RestApiModelPostImage {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public url: string;
}
