import { UserProvider } from '@core/common/enums/user-provider.enum';
import { User } from '@prisma/client';

// 멤버변수 를 Readonly 으로 선언한 이유

export class UserDto {
  private id: number;
  private name: string;
  private email: string;
  private provider: UserProvider;

  static of(payload: { email: string; provider: UserProvider }): UserDto {
    const dto = new UserDto();
    dto.email = payload.email;
    dto.provider = payload.provider;
    return dto;
  }
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
  public getEmail(): string {
    return this.email;
  }
  public getProvider(): UserProvider {
    return this.provider;
  }
}
