import { UserProvider } from '@core/common/enums/user-provider.enum';
import { User } from '@prisma/client';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { UserDto } from '../../user.dto';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  public id: number;

  @Expose()
  public email: string;

  @Expose()
  public provider: UserProvider;

  public static newFromUser(user: UserDto): UserUseCaseDto {
    return plainToInstance(UserUseCaseDto, user);
  }

  public static newListFromUsers(users: UserDto[]): UserUseCaseDto[] {
    return users.map((user) => this.newFromUser(user));
  }
}
