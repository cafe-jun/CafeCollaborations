import { NotFoundException } from '@nestjs/common';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { CreateUserUseCase } from '@core/domain/user/usecase/user.usecase';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/user.repository.port';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/user.usecase.dto';
import { CreateUserPort } from '@core/domain/user/port/usecase/user.port';
import { User } from '@core/domain/user/entity/user';

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
