import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { Module, Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

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

@Module({
  providers: [...persistenceProvider, ...useCaseProviders],
  exports: [UserDiTokens.UserRepository],
})
export class UserModule {}
