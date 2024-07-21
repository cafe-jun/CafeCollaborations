import { UserProvider, UserRole } from '@core/common/enums/user.enum';

export interface CreateUserPort {
  name: string;
  email: string;
  provider: UserProvider;
  role?: UserRole;
}
