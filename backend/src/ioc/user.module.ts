import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { PrismaUserRepository } from '@infrastructure/adapter/persistence/prisma/repository/user/prisma.user.repository';
import { Module, Provider } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaToken } from './infrastructure.module';
import { UserController } from '@presentation/user.controller';
import { HandleGetUserPreviewQueryService } from '@core/service/user/handler/get-user-preview-query.service';
import { NestWrapperGetUserPreviewQueryHandler } from '@infrastructure/handler/user/nest-wrapper-get-user-preview.handler';
import { CreateUserService } from '@core/service/user/usecase/create-user.service';
import { GetUserService } from '@core/service/user/usecase/get-user.service';

const persistenceProvider: Provider[] = [
  {
    provide: UserDiTokens.UserRepository,
    useFactory: (prismaService: PrismaService) => new PrismaUserRepository(prismaService),
    inject: [PrismaToken],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: UserDiTokens.CreateUserUseCase,
    useFactory: (userRepository) => new CreateUserService(userRepository),
    inject: [UserDiTokens.UserRepository],
  },
  {
    provide: UserDiTokens.GetUserUseCase,
    useFactory: (userRepository) => new GetUserService(userRepository),
    inject: [UserDiTokens.UserRepository],
  },
];

const handlerProvider: Provider[] = [
  NestWrapperGetUserPreviewQueryHandler,
  {
    provide: UserDiTokens.GetUserPreviewQueryHandler,
    useFactory: (userRepository) => new HandleGetUserPreviewQueryService(userRepository),
    inject: [UserDiTokens.UserRepository],
  },
];

@Module({
  controllers: [UserController],
  providers: [...persistenceProvider, ...useCaseProviders, ...handlerProvider],
  exports: [UserDiTokens.UserRepository],
})
export class UserModule {}
