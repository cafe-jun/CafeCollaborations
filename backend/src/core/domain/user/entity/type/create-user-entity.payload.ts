import { UserProvider, UserRole } from '@core/common/enums/user.enum';

export type CreateUserEntityPayload = {
  id?: number;
  name: string;
  email: string;
  provider: UserProvider;
  role?: UserRole;
  createdAt?: Date;
};
