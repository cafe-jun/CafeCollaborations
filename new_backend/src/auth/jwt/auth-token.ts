export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}
export interface TokenPayload {
  sub: number;
  email: string;
}
