import { UserProvider } from '@core/common/enums/user-provider.enum';

export interface CreateUserPort {
  email: string;
  provider: UserProvider;
}
