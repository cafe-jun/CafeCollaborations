import { Optional } from '@core/common/type/common.types';
import { Post } from '@core/domain/post/entity/post';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaToken } from 'src/di/infrastructure.module';

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
  addPost(Post: Post): Promise<{ id: number }> {}
  countPosts(): Promise<number> {}
  findPostById(id: number): Promise<Optional<Post>> {}
  findPosts(): Promise<Optional<Post>> {}
  updatePost(id: number, Post: Post): Promise<{ id: number }> {}
}
