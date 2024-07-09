import { UserProvider } from '@core/common/enums/user-provider.enum';
import { Request } from 'express';

export type HttpUserPayload = {
  id: number;
  email: string;
  provider: UserProvider;
};

export type HttpRequestsWIthUser = Request & { user: HttpUserPayload };

export type HttpLoggedInUser = {
  id: number;
  access_token: string;
};
