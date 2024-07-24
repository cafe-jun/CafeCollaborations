import { NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '../port/persistence/user.repository.port';
import { GetUserUseCase } from '../usecase/user.usecase';
import { UserUseCaseDto } from '../usecase/dto/user.usecase.dto';
import { User } from '../entity/user';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { CreateUserPort, GetUserPort } from '../port/usecase/user.port';

export class GetUserService implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}
  public async execute(payload: GetUserPort): Promise<UserUseCaseDto> {
    const user = await this.userRepository.findUserById(payload.userId);
    return UserUseCaseDto.newFromUser(user);
  }
}
