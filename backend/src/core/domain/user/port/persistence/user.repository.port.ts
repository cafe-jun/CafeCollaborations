import { Optional } from '@core/common/type/common.types';
import { User } from '../../entity/user';

export interface UserRepositoryPort {
  findUserById(id: number): Promise<Optional<User>>;
  findUserByEmail(email: string): Promise<Optional<User>>;
  countUsers(): Promise<number>;
  addUser(user: User): Promise<{ id: number }>;
  updateUser(user: User): Promise<{ id: number }>;
}
