import { ApiProperty } from '@nestjs/swagger';

export class RestGetUserRequestDto {
  @ApiProperty({ type: 'string' })
  email: string;
}
