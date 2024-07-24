import { Optional } from '@core/common/type/common.types';
import { User } from '../../entity/user';
import { RepositoryFindOptions } from '@core/common/persistence/repoistory.option';

export interface UserRepositoryPort {
  findUser(by: { id?: number; email?: string }, options?: RepositoryFindOptions): Promise<Optional<User>>;
  findUserById(id: number): Promise<Optional<User>>;
  findUserByEmail(email: string): Promise<Optional<User>>;
  countUsers(): Promise<number>;
  addUser(user: User): Promise<{ id: number }>;
  updateUser(id, user: User): Promise<{ id: number }>;
}
