import { Optional } from '@core/common/type/common.types';
import { Comment } from '@core/domain/comment/entity/comment';
import { CommentRepositoryPort } from '@core/domain/comment/port/persistence/comment.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaCommentMapper } from '../../entity/comment/mapper/prisma-comment.mapper';
import { PrismaToken } from '@di/infrastructure.module';
import { PrismaService } from 'nestjs-prisma';
import { isEmpty } from '@shared/data.helper';

@Injectable()
export class PrismaCommentRepository implements CommentRepositoryPort {
  constructor(
    @Inject(PrismaToken)
    private readonly prismaService: PrismaService,
  ) {}

  async addComment(comment: Comment): Promise<{ id: number }> {
    const prismaComment = PrismaCommentMapper.toPrisma(comment);
    const saveComment = await this.prismaService.comment.create({
      data: prismaComment,
    });
    return { id: saveComment.id };
  }

  async findCommentById({ id }: { id: number }): Promise<Optional<Comment>> {
    const comment = await this.prismaService.comment.findFirst({
      where: {
        id,
      },
    });
    if (isEmpty(comment)) {
      return null;
    }
    return PrismaCommentMapper.toDomain(comment);
  }

  async findComments(postId: number, paging: { pageNo: number; pageSize: number }): Promise<{ items: Comment[]; totalCount: number }> {
    const comments = await this.prismaService.comment.findMany({
      skip: (paging.pageNo - 1) * paging.pageSize,
      take: paging.pageSize,
      where: {
        postId,
      },
    });
    const totalCount = await this.prismaService.comment.count({
      where: {
        postId,
      },
    });
    return { items: PrismaCommentMapper.toDomainEntities(comments), totalCount };
  }
}
