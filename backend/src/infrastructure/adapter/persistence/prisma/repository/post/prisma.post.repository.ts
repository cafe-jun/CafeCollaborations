import { Optional } from '@core/common/type/common.types';
import { Post } from '@core/domain/post/entity/post';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaToken } from 'src/ioc/infrastructure.module';
import { isEmpty } from 'lodash';
import { PrismaPostMapper } from '../../entity/post/mapper/prisma-post.mapper';

@Injectable()
export class PrismaUserRepository implements PostRepositoryPort {
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
  async addPost(post: Post): Promise<{ id: number }> {
    const prismaPost = PrismaPostMapper.toPrisma(post);
    const savePost = await this.prismaService.post.create({
      data: prismaPost,
    });
    return { id: savePost.id };
  }
  async countPosts(): Promise<number> {
    return await this.prismaService.post.count();
  }
  async findPostById(by: { id: number }): Promise<Optional<Post>> {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: by.id,
      },
    });
    if (isEmpty(post)) {
      return null;
    }
    return PrismaPostMapper.toDomain(post);
  }
  async findPosts(): Promise<Optional<Post[]>> {
    const posts = await this.prismaService.post.findMany();
    return PrismaPostMapper.toDomainEntities(posts);
  }
  async updatePost(post: Post): Promise<{ id: number }> {
    const prismaPost = PrismaPostMapper.toPrisma(post);
    const result = await this.prismaService.user.update({
      data: prismaPost,
      where: {
        id: post.getId(),
      },
    });
    return { id: result.id };
  }
}
