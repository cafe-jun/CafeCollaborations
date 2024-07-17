import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { CreateUserUseCase } from '@core/domain/user/usecase/create-user.usecase';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/user.usecase.dto';
import { CreateUserRequestDto } from './dto/user/request/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserDiTokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}
  @Post()
  async createUser(@Body() body: CreateUserRequestDto): Promise<UserUseCaseDto> {
    return await this.createUserUseCase.execute(body);
  }
}
