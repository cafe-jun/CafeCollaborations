import { User } from '@core/domain/user/entity/user';

export interface OAuthValidateToken {
  validateToken(token: string): Promise<User>;
}
