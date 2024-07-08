import { UserProvider } from '@core/common/enums/user-provider.enum';

export type CreateUserEntityPayload = {
  name: string;
  email: string;
  provider: UserProvider;
};
