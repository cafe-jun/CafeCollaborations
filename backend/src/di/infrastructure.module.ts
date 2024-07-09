import { DB } from '@lib/prisma/generated/types';
import { Global, Module } from '@nestjs/common';
import { Kysely, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler } from 'kysely';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import kyselyExtension from 'prisma-extension-kysely';
export const PrismaToken = 'PrismaService';

@Global()
@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: {
          log: [{ emit: 'event', level: 'query' }],
        },
      },
    }),
  ],
  providers: [
    {
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
    },
  ],
  exports: [PrismaToken],
})
export class InfrastructureModule {}
