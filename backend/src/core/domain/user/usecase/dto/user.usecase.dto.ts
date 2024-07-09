import { UserProvider } from '@core/common/enums/user-provider.enum';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { User } from '../../entity/user';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public provider: UserProvider;

  public static newFromUser(user: User): UserUseCaseDto {
    return plainToInstance(UserUseCaseDto, user);
  }

  public static newListFromUsers(users: User[]): UserUseCaseDto[] {
    return users.map((user) => this.newFromUser(user));
  }
}
