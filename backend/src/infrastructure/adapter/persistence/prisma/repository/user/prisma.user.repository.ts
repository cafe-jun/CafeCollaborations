import { PrismaToken } from '@application/api/di/infrastructure.module';
import { Optional } from '@core/common/type/common.types';
import { User } from '@core/domain/user/entity/user';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/user.repository.port';

import { ExtendedPrismaClient } from '@infrastructure/adapter/persistence/prisma/extension/prisma.extension';
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaUserMapper } from '../../entity/user/mapper/prisma-user.mapper';

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
  async addUser(user: User): Promise<{ id: number }> {
    const prismaUser = PrismaUserMapper.toPrisma(user);
    const saveUser = await this.prismaService.client.user.create({
      data: prismaUser,
    });
    return { id: saveUser.id };
  }
  async countUsers(): Promise<number> {
    return 123;
  }
  async findUserByEmail(email: string): Promise<Optional<User>> {
    const user = await this.prismaService.client.user.findFirst({
      where: {
        email,
      },
    });
    return PrismaUserMapper.toDomain(user);
  }
  async findUserById(id: number): Promise<Optional<User>> {
    const user = await this.prismaService.client.user.findFirst({
      where: {
        id,
      },
    });
    return PrismaUserMapper.toDomain(user);
  }
  async updateUser(user: User): Promise<{ id: number }> {
    const prismaUser = PrismaUserMapper.toPrisma(user);
    const result = await this.prismaService.client.user.update({
      data: prismaUser,
      where: {
        id: user.getId(),
      },
    });
    return { id: result.id };
  }
}
