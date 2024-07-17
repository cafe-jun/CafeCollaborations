import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaToken } from 'src/di/infrastructure.module';

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(
    @Inject(PrismaToken)
    private readonly prismaService: PrismaService,
  ) {}
  async findById(id: number) {
    return await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }
}
