import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { Module, Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { CustomPrismaService } from 'nestjs-prisma';

const persistenceProvider: Provider[] = [
  {
    provide: UserDiTokens.UserRepository,
    useFactory: () => {},
    inject: [PrismaClient],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: UserDiTokens.GetUserUseCase,
    useFactory: () => {},
    inject: [UserDiTokens.UserRepository],
  },
];

const handlerProviders: Provider[] = [
  {
    provide: UserDiTokens.GetUserPreviewQueryHandler,
    useFactory: (userRepository) => {},
    inject: [UserDiTokens.UserRepository],
  },
];

@Module({
  providers: [...persistenceProvider, ...useCaseProviders, ...handlerProviders],
  exports: [UserDiTokens.UserRepository],
})
export class UserModule {}
