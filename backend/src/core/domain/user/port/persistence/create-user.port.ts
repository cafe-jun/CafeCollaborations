import { UserProvider } from '@core/common/enums/user-provider.enum';

export interface CreateUserPort {
  name: string;
  email: string;
  provider: UserProvider;
}
