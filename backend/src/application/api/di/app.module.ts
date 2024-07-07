import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { InfrastructureModule } from './infrastructure.module';

@Module({
  imports: [AuthModule, InfrastructureModule],
})
export class AppModule {}
