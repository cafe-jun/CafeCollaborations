import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../core/domain/auth/service/auth.service';
import { UserModule } from './user.module';
import { AuthController } from '@presentation/auth.controller';

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
