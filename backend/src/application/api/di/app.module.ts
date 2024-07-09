import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { InfrastructureModule } from './infrastructure.module';
import { UserModule } from './user.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { ClassValidator } from '@core/common/util/class-validator/class-validator';

@Module({
  imports: [AuthModule, InfrastructureModule, UserModule],

  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transformOptions: {
            enableImplicitConversion: true,
          },
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          exceptionFactory: (errors: ValidationError[]) => {
            return ClassValidator.validate(errors);
          },
        }),
    },
  ],
})
export class AppModule {}
