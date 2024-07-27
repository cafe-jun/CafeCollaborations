import { NotFoundException } from '@nestjs/common';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { GetUserPort } from '@core/domain/user/port/usecase/user.port';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/user.usecase.dto';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/user.repository.port';
import { GetUserUseCase } from '@core/domain/user/usecase/user.usecase';

export class GetUserService implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}
  public async execute(payload: GetUserPort): Promise<UserUseCaseDto> {
    const user = await this.userRepository.findUserById(payload.userId);
    return UserUseCaseDto.newFromUser(user);
  }
}
