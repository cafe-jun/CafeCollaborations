import { OAuth2Client } from 'google-auth-library';
import { OAuthValidateToken } from './oauth.validate';
import { User } from '@core/domain/user/entity/user';
import { UserProvider } from '@core/common/enums/user-provider.enum';
import axios from 'axios';

export class NaverValidateToken implements OAuthValidateToken {
  constructor() {}

  async validateToken(token: string): Promise<User> {
    const valudateResult = await axios.get(process.env.NAVER_OAUTH_USER_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = valudateResult.data;
    const { email, name } = user.response;
    return new User({ email: email, name: name, provider: UserProvider.NAVER });
  }
}
