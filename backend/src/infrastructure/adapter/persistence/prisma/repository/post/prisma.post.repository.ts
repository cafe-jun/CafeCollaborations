import { Optional } from '@core/common/type/common.types';
import { Post } from '@core/domain/post/entity/post';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaPostMapper } from '../../entity/post/mapper/prisma-post.mapper';
import { RepositoryRemoveOptions } from '@core/common/persistence/repoistory.option';
import { PrismaToken } from '@di/infrastructure.module';
import { isEmpty } from 'lodash';

@Injectable()
export class PrismaPostRepository implements PostRepositoryPort {
  constructor(
    @Inject(PrismaToken)
    private readonly prismaService: PrismaService,
  ) {}
  public async findById(id: number) {
    return await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  public async addPost(post: Post): Promise<{ id: number }> {
    console.log('post category ', post.getCategory());
    const prismaPost = PrismaPostMapper.toPrisma(post);
    console.log('prismaPost ', prismaPost);
    const savePost = await this.prismaService.post.create({
      data: prismaPost,
    });
    return { id: savePost.id };
  }

  public async findPostById(by: { id: number }): Promise<Optional<Post>> {
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

  public async findPosts(by: { pageNo: number; pageSize: number }): Promise<{ items: Post[]; totalCount: number }> {
    const posts = await this.prismaService.post.findMany({
      skip: (by.pageNo - 1) * by.pageSize,
      take: by.pageSize,
    });
    const totalCount = await this.prismaService.post.count();
    return { items: PrismaPostMapper.toDomainEntities(posts), totalCount: totalCount };
  }

  public async updatePost(post: Post): Promise<{ id: number }> {
    const prismaPost = PrismaPostMapper.toPrisma(post);
    const result = await this.prismaService.user.update({
      data: prismaPost,
      where: {
        id: post.getId(),
      },
    });
    return { id: result.id };
  }

  public async removePost(post: Post, options?: RepositoryRemoveOptions): Promise<void> {
    await this.prismaService.post.delete({
      where: {
        id: post.getId(),
      },
    });
  }
}
