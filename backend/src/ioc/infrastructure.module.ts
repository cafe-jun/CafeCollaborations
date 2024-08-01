import { NestRestExceptionFilter } from '@application/filter/exception.filter';
import { CoreDITokens } from '@core/common/di/core-di.token';
import { NestCommandBusAdapter } from '@infrastructure/adapter/message/nest-command-bus.adapter';
import { NestEventBusAdapter } from '@infrastructure/adapter/message/nest-event-bus.adapter';
import { NestQueryBusAdapter } from '@infrastructure/adapter/message/nest-query-bus.adapter';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DB } from '@lib/prisma/generated/types';
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { Kysely, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler } from 'kysely';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import kyselyExtension from 'prisma-extension-kysely';
import { SearchModule } from './search.module';

export const PrismaToken = 'PrismaService';

const CqrsProvider: Provider[] = [
  {
    provide: CoreDITokens.CommandBus,
    useClass: NestCommandBusAdapter,
  },
  {
    provide: CoreDITokens.EventBus,
    useClass: NestEventBusAdapter,
  },
  {
    provide: CoreDITokens.QueryBus,
    useClass: NestQueryBusAdapter,
  },
];

const prismaProvider: Provider = {
  inject: [PrismaService],
  provide: PrismaToken,
  useFactory: (prisma: PrismaService) => {
    const customPrisma = prisma.$extends(
      kyselyExtension({
        kysely: (driver) =>
          new Kysely<DB>({
            log: ['query'],
            dialect: {
              // This is where the magic happens!
              createDriver: () => driver,
              // Don't forget to customize these to match your database!
              createAdapter: () => new PostgresAdapter(),
              createIntrospector: (db) => new PostgresIntrospector(db),
              createQueryCompiler: () => new PostgresQueryCompiler(),
            },
            plugins: [
              // Add your favorite plugins here!
            ],
          }),
      }),
    );
    return customPrisma;
  },
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      },
    }),
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: {
          log: [{ emit: 'event', level: 'query' }],
        },
      },
    }),
    SearchModule,
  ],
  providers: [
    ...CqrsProvider,
    prismaProvider,
    {
      provide: APP_FILTER,
      useClass: NestRestExceptionFilter,
    },
  ],
  exports: [PrismaToken, ...CqrsProvider],
})
export class InfrastructureModule {}
