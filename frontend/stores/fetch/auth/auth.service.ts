import Service from '@/stores/fetch/service';

class AuthService extends Service {
  async validateToken(payload: {
    provider: string | undefined;
    token: string | undefined;
  }): Promise<any> {
    return this.http
      .post<{ data: { accessToken: string; refreshToken: string } }>(
        '/auth/token',
        payload
      )
      .then((res) => res);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
