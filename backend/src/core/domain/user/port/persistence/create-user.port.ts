import { UserProvider } from '@core/common/enums/user.enum';

export interface CreateUserPort {
  name: string;
  email: string;
  provider: UserProvider;
}
