import { UserRole } from '@core/common/enums/user.enum';

export interface CreateUserPort {
  name: string;
  email: string;
  provider: string;
  role: UserRole;
}
export interface GetUserPort {
  userId: number;
}
