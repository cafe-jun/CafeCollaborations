import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { PrismaUserRepository } from '@infrastructure/adapter/persistence/prisma/repository/user/prisma.user.repository';
import { Module, Provider } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaToken } from './infrastructure.module';
import { CreateUserService } from '@core/domain/user/service/create-user.service';
import { UserController } from '@presentation/user.controller';
import { GetUserService } from '@core/domain/user/service/get-user.service';

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

@Module({
  controllers: [UserController],
  providers: [...persistenceProvider, ...useCaseProviders],
  exports: [UserDiTokens.UserRepository],
})
export class UserModule {}
