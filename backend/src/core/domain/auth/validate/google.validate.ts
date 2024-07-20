import { OAuth2Client } from 'google-auth-library';
import { OAuthValidateToken } from './oauth.validate';
import { User } from '@core/domain/user/entity/user';
import { UserProvider } from '@core/common/enums/user.enum';

export class GoogleValidateToken implements OAuthValidateToken {
  constructor() {}

  async validateToken(token: string): Promise<User> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const user = ticket.getPayload();
    return new User({ email: user.email, name: user.name, provider: UserProvider.GOOGLE });
  }
}
