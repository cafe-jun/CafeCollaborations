import { Optional } from '@core/common/type/common.types';
import { Post } from '@core/domain/post/entity/post';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaToken } from 'src/ioc/infrastructure.module';
import { isEmpty } from 'lodash';
import { PrismaPostMapper } from '../../entity/post/mapper/prisma-post.mapper';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { RepositoryRemoveOptions } from '@core/common/persistence/repoistory.option';

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
  async findAllPost(): Promise<Post[]> {
    const prismaPosts = await this.prismaService.post.findMany();
    return PrismaPostMapper.toDomainEntities(prismaPosts);
  }

  public async addPost(post: Post): Promise<{ id: number }> {
    const prismaPost = PrismaPostMapper.toPrisma(post);
    const savePost = await this.prismaService.post.create({
      data: prismaPost,
    });
    return { id: savePost.id };
  }
  async countPosts(): Promise<number> {
    return await this.prismaService.post.count();
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

  public async findPostByPagination(by: { pageNo: number; pageSize: number }): Promise<{ items: Post[]; totalCount: number }> {
    const posts = await this.prismaService.post.findMany({
      skip: (by.pageNo - 1) * by.pageSize,
      take: by.pageSize,
    });
    const totalCount = await this.prismaService.post.count();
    return { items: PrismaPostMapper.toDomainEntities(posts), totalCount: totalCount };
  }

  public async findPosts(payload: { ownerId: number; status: PostStatus }): Promise<Optional<Post[]>> {
    const posts = await this.prismaService.post.findMany({
      where: {
        owner: {
          id: payload.ownerId,
        },
        status: payload.status,
      },
    });
    return PrismaPostMapper.toDomainEntities(posts);
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
