import { NotFoundException } from '@nestjs/common';
import { CreateUserPort } from '../../port/persistence/create-user.port';
import { UserRepositoryPort } from '../../port/persistence/user.repository.port';
import { CreateUserUseCase } from '../../usecase/create-user.usecase';
import { UserUseCaseDto } from '../../usecase/dto/user.usecase.dto';
import { User } from '../../entity/user';

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}
  async execute(usecasePort: CreateUserPort): Promise<UserUseCaseDto> {
    const isExistUser = await this.userRepository.findUserByEmail(usecasePort.email);
    if (isExistUser) {
      throw new NotFoundException('not found user');
    }
    const user = new User({
      name: usecasePort.name,
      email: usecasePort.email,
      provider: usecasePort.provider,
    });
    await this.userRepository.addUser(user);
    return UserUseCaseDto.newFromUser(user);
  }
}
