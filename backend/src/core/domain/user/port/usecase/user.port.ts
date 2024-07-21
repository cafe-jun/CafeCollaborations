import { UserProvider, UserRole } from '@core/common/enums/user.enum';

export type CreateUserPort = {
  name: string;
  email: string;
  provider: UserProvider;
  role?: UserRole;
};
export type GetUserPort = {
  userId: number;
};
