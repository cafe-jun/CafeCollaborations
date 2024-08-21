import { get } from 'env-var';

export class ApiConfig {
  public static DB_URL: string = get('DATABASE_URL').required().asString();
  public static PORT: number = get('PORT').required().asPortNumber();
  public static JWT_ACCESS_SECRET: string = get('JWT_ACCESS_SECRET').required().asString();
  public static JWT_REFRESH_SECRET: string = get('JWT_REFRESH_SECRET').required().asString();
}
