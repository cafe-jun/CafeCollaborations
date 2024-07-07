import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../http-rest/controller/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [],
  controllers: [AuthController],
})
export class AuthModule {}
