import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { InfrastructureModule } from './infrastructure.module';
import { UserModule } from './user.module';

@Module({
  imports: [AuthModule, InfrastructureModule, UserModule],
})
export class AppModule {}
