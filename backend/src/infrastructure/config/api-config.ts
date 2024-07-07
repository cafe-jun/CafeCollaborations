import { get } from 'env-var';

export class ApiConfig {
  public static PORT: number = get('PORT').required().asPortNumber();
}
