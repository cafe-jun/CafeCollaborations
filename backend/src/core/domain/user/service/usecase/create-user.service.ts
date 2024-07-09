import { NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '../../port/persistence/user.repository.port';
import { CreateUserUseCase } from '../../usecase/create-user.usecase';
import { UserUseCaseDto } from '../../usecase/dto/user.usecase.dto';
import { User } from '../../entity/user';
import { CreateUserRequestDto } from 'src/presentation/controller/dto/user/request/create-user.dto';
import { CoreAssert } from '@core/common/util/assert/core.assert';

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}
  async execute(dto: CreateUserRequestDto): Promise<UserUseCaseDto> {
    const isExistUser = await this.userRepository.findUserByEmail(dto.email);
    CoreAssert.notEmpty(isExistUser, new NotFoundException('User not found'));
    const user = new User({
      name: dto.name,
      email: dto.email,
      provider: dto.provider,
    });
    const saveUser = await this.userRepository.addUser(user);
    return UserUseCaseDto.newFromUser(user);
  }
}
