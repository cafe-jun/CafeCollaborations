import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../presentation/controller/auth.controller';
import { AuthService } from '../core/domain/auth/service/auth.service';
import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
