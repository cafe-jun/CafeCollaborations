import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { InfrastructureModule } from './infrastructure.module';
import { UserModule } from './user.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { ClassValidator } from '@core/common/util/class-validator/class-validator';
import { AppHeaderProvider } from '@shared/app-header.provider';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PostModule } from './post.module';

@Module({
  imports: [
    AuthModule,
    InfrastructureModule,
    UserModule,
    PostModule,
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [PrismaModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: PrismaService,
          }),
        }),
      ],
    }),
  ],
  providers: [AppHeaderProvider],
})
export class AppModule {}
