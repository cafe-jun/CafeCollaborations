import { NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '../port/persistence/user.repository.port';
import { CreateUserUseCase } from '../usecase/user.usecase';
import { UserUseCaseDto } from '../usecase/dto/user.usecase.dto';
import { User } from '../entity/user';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { CreateUserPort } from '../port/usecase/user.port';

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}
  public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const isExistUser = await this.userRepository.findUserByEmail(payload.email);
    CoreAssert.notEmpty(isExistUser, new NotFoundException('User not found'));
    const user = new User({
      name: payload.name,
      email: payload.email,
      provider: payload.provider,
      role: payload.role,
    });
    await this.userRepository.addUser(user);
    return UserUseCaseDto.newFromUser(user);
  }
}
