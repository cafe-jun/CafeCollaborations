import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../core/domain/auth/service/auth.service';
import { UserModule } from './user.module';
import { AuthController } from '@presentation/auth.controller';
import { JwtAccessTokenStrategy } from '@application/auth/strategy/access-token.strategy';
import { ApiConfig } from '@infrastructure/config/api-config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: ApiConfig.JWT_ACCESS_KEY,
      signOptions: {
        expiresIn: '6h',
      },
    }),
  ],
  providers: [AuthService, JwtAccessTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
