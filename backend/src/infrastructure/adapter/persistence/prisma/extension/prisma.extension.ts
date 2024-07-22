import { DB } from '@lib/prisma/generated/types';
import { PrismaClient } from '@prisma/client';
import { Kysely, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler } from 'kysely';
import kyselyExtension from 'prisma-extension-kysely';
/**
 * @deprecated : 사용 안되는 Prisma Client Extend
 */
export const extendedPrismaClient = new PrismaClient().$extends(
  kyselyExtension({
    kysely: (driver) =>
      new Kysely<DB>({
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

export type ExtendedPrismaClient = typeof extendedPrismaClient;
