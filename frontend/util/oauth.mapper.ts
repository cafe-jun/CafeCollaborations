export const OauthUserMapper = (
  account: any
): { provider: string; token: string } | null => {
  switch (account.provider) {
    case 'kakao':
      return {
        provider: 'KAKAO',
        token: account.access_token,
      };
    case 'google': {
      return {
        provider: 'GOOGLE',
        token: account.id_token,
      };
    }
    case 'naver': {
      return {
        provider: 'NAVER',
        token: account.access_token,
      };
    }
    default:
      return {
        provider: 'local',
        token: 'Test',
      };
  }
};
