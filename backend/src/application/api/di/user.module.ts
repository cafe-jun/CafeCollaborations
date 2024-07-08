import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { CreateUserService } from '@core/domain/user/service/usecase/create-user.service';
import { extendedPrismaClient } from '@infrastructure/adapter/persistence/prisma/extension/prisma.extension';
import { PrismaUserRepository } from '@infrastructure/adapter/persistence/prisma/repository/user/prisma.user.repository';
import { Module, Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { PrismaService } from 'nestjs-prisma';

const persistenceProvider: Provider[] = [
  {
    provide: UserDiTokens.UserRepository,
    useFactory: (prismaService) => new PrismaUserRepository(prismaService),
    inject: [PrismaService],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: UserDiTokens.CreateUserUseCase,
    useFactory: (userRepository) => new CreateUserService(userRepository),
    inject: [UserDiTokens.UserRepository],
  },
];

@Module({
  providers: [...persistenceProvider, ...useCaseProviders],
  exports: [UserDiTokens.UserRepository],
})
export class UserModule {}
