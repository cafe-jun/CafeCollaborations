import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { CreateUserService } from '@core/domain/user/service/usecase/create-user.service';
import { Controller, Inject, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserDiTokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserService,
  ) {}
  @Post()
  createUser() {
    // await this.createUserUseCase.execute()
  }
}
