import { UserProvider } from '@core/common/enums/user.enum';

export type CreateUserEntityPayload = {
  name: string;
  email: string;
  provider: UserProvider;
};
