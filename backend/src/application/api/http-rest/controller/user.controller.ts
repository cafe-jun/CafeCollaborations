import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { CreateUserUseCase } from '@core/domain/user/usecase/create-user.usecase';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserDiTokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}
  @Post()
  async createUser(@Body() data) {
    await this.createUserUseCase.execute(data);
  }
}
