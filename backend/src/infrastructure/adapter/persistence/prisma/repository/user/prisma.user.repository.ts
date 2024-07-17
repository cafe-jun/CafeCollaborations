import { PrismaToken } from 'src/di/infrastructure.module';
import { Optional } from '@core/common/type/common.types';
import { User } from '@core/domain/user/entity/user';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/user.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaUserMapper } from '../../entity/user/mapper/prisma-user.mapper';
import { isEmpty } from '@shared/data.helper';

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
  async addUser(user: User): Promise<{ id: number }> {
    const prismaUser = PrismaUserMapper.toPrisma(user);

    const saveUser = await this.prismaService.user.create({
      data: prismaUser,
    });
    return { id: saveUser.id };
  }
  async countUsers(): Promise<number> {
    return await this.prismaService.user.count();
  }
  async findUserByEmail(email: string): Promise<Optional<User>> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (isEmpty(user)) {
      return null;
    }
    return PrismaUserMapper.toDomain(user);
  }
  async findUserById(id: number): Promise<Optional<User>> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
    return PrismaUserMapper.toDomain(user);
  }
  async updateUser(user: User): Promise<{ id: number }> {
    const prismaUser = PrismaUserMapper.toPrisma(user);
    const result = await this.prismaService.user.update({
      data: prismaUser,
      where: {
        id: user.getId(),
      },
    });
    return { id: result.id };
  }
}
