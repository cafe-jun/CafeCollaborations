import { OAuth2Client } from 'google-auth-library';
import { OAuthValidateToken } from './oauth.validate';
import { User } from '@core/domain/user/entity/user';
import { UserProvider } from '@core/common/enums/user-provider.enum';
import axios from 'axios';

export class KakaoValidateToken implements OAuthValidateToken {
  constructor() {}

  async validateToken(token: string): Promise<User> {
    const validateResult = await axios.get(process.env.KAKAO_OAUTH_USER_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = validateResult.data;
    return new User({ email: user.email, name: user.name, provider: UserProvider.KAKAO });
  }
}
