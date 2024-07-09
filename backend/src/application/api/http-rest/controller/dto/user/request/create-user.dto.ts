import { UserProvider } from '@core/common/enums/user-provider.enum';
import { IsEnum, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsEnum(UserProvider)
  provider: UserProvider;
}
