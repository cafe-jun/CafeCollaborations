import { UserProvider } from '@core/common/enums/user.enum';
import { Request } from 'express';

export type RestUserPayload = {
  id: number;
  email: string;
  provider: UserProvider;
};

export type RequestsWIthUser = Request & { user: RestUserPayload };

export type RestLoggedInUser = {
  id: number;
  access_token: string;
};
