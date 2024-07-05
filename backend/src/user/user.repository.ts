import { ExtendedPrismaClient } from '@app/prisma/prisma.extension';
import { PrismaToken } from '@app/prisma/prisma.module';
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(PrismaToken)
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}
  findById(id: number) {
    return this.prismaService.client.user.findFirst({
      where: {
        id,
      },
    });
  }
}
