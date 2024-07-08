import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { CreateUserService } from '@core/domain/user/service/usecase/create-user.service';
import { ExtendedPrismaClient, extendedPrismaClient } from '@infrastructure/adapter/persistence/prisma/extension/prisma.extension';
import { PrismaUserRepository } from '@infrastructure/adapter/persistence/prisma/repository/user/prisma.user.repository';
import { Module, Provider } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaToken } from './infrastructure.module';

const persistenceProvider: Provider[] = [
  {
    provide: UserDiTokens.UserRepository,
    useFactory: (prismaService: CustomPrismaService<ExtendedPrismaClient>) => new PrismaUserRepository(prismaService),
    inject: [PrismaToken],
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
