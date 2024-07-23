import { ApiProperty } from '@nestjs/swagger';

export class RestGetUserRequestDto {
  @ApiProperty({ type: 'number' })
  userId: number;
}
