import { Module } from '@nestjs/common';
import { CustomPrismaModule, PrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';

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
export class DatabaseModule {}
