import { UserProvider } from '@core/common/enums/user-provider.enum';
import { IsEnum, IsString } from 'class-validator';

export class ValidateTokenDto {
  @IsString()
  token: string;

  @IsEnum(UserProvider)
  provider: UserProvider;
}
