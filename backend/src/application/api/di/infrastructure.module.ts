import { extendedPrismaClient } from '@infrastructure/adapter/persistence/prisma/extension/prisma.extension';
import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';

export const PrismaToken = 'PrismaService';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: PrismaToken,
      useFactory: () => {
        return extendedPrismaClient;
      },
    }),
  ],
})
export class InfrastructureModule {}
