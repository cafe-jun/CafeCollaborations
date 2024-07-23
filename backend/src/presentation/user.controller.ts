import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { CreateUserUseCase, GetUserUseCase } from '@core/domain/user/usecase/user.usecase';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Query } from '@nestjs/common';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/user.usecase.dto';
import { RestCreateUserRequestDto } from './rest-doc/user/create-user-request.dto';
import { CreateUserAdapter } from '@infrastructure/adapter/usecase/user/create-user.adapter';
import { RestGetUserRequestDto } from './rest-doc/user/find-user.dto';
import { GetUserPort } from '@core/domain/user/port/usecase/user.port';
import { GetUserAdapter } from '@infrastructure/adapter/usecase/user/get-user.adapter';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserDiTokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(UserDiTokens.GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  async createUser(@Body() body: RestCreateUserRequestDto): Promise<UserUseCaseDto> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.create({
      email: body.email,
      name: body.name,
      provider: body.provider,
    });
    return await this.createUserUseCase.execute(adapter);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUser(@Query() query: RestGetUserRequestDto) {
    const adapter: GetUserAdapter = await GetUserAdapter.create({ userId: query.userId });
    await this.getUserUseCase.execute(adapter);
  }
}
