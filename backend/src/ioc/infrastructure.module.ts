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
import { CqrsModule } from '@nestjs/cqrs';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { Kysely, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler } from 'kysely';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import kyselyExtension from 'prisma-extension-kysely';

export const PrismaToken = 'PrismaService';

export const ElasticToken = 'ElasticsearchService';
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

const elasticProvider: Provider = {
  provide: ElasticToken,
  useFactory: (elasticService) => {
    return elasticService;
  },
  inject: [ElasticsearchService],
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
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
    }),
    CqrsModule,
  ],
  providers: [
    ...CqrsProvider,
    prismaProvider,
    elasticProvider,
    {
      provide: APP_FILTER,
      useClass: NestRestExceptionFilter,
    },
  ],
  exports: [PrismaToken, ElasticToken, ...CqrsProvider],
})
export class InfrastructureModule {}
