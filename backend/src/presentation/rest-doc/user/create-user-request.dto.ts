import { UserProvider } from '@core/common/enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class RestCreateUserRequestDto {
  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ enum: UserProvider })
  provider: UserProvider;
}
