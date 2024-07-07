import { Optional } from '@core/common/type/common.types';
import { UserDto } from '@core/domain/user/user.dto';

export interface UserRepositoryPort {
  findUserById(id: number): Promise<Optional<UserDto>>;
  findUserByEmail(email: string): Promise<Optional<UserDto>>;
  countUsers(): Promise<number>;
  addUser(user: UserDto): Promise<{ id: number }>;
  updateUser(user: UserDto): Promise<{ id: number }>;
}
