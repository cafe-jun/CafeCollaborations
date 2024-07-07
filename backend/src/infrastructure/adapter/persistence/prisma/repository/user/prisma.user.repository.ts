import { PrismaToken } from '@application/api/di/infrastructure.module';
import { Optional } from '@core/common/type/common.types';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/user.repository.port';
import { UserDto } from '@core/domain/user/user.dto';
import { ExtendedPrismaClient } from '@infrastructure/adapter/persistence/prisma/extension/prisma.extension';
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(
    @Inject(PrismaToken)
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}
  async findById(id: number) {
    return await this.prismaService.client.user.findFirst({
      where: {
        id,
      },
    });
  }
  async addUser(user: UserDto): Promise<{ id: number }> {
    const saveUser = await this.prismaService.client.user.create({
      data: {
        email: user.getEmail(),
        provider: 'GOOGLE',
        name: 'test',
      },
    });
    return { id: saveUser.id };
  }
  async countUsers(): Promise<number> {
    return 123;
  }
  async findUserByEmail(email: string): Promise<Optional<UserDto>> {
    const user = await this.prismaService.client.user.findFirst({
      where: {
        email,
      },
    });
  }
  async findUserById(id: number): Promise<Optional<UserDto>> {
    return await this.prismaService.client.user.findFirst();
  }
  async updateUser(user: UserDto): Promise<{ id: number }> {}
}
