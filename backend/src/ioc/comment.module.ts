import { PrismaCommentRepository } from '@infrastructure/adapter/persistence/prisma/repository/comment/prisma.comment.repository';
import { Module, Provider } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaToken } from './infrastructure.module';
import { CommentDITokens } from '@core/domain/comment/di/comment-di.token';
import { CreateCommentService } from '@core/service/comment/usecase/create-comment.service';
import { CreateCommentUseCase, GetAllCommentUseCase } from '@core/domain/comment/usecase/comment.usecase';
import { CoreDITokens } from '@core/common/di/core-di.token';
import { PostDITokens } from '@core/domain/post/di/post-di.token';
import { persistencePostProvider } from './post.module';
import { PrismaPostRepository } from '@infrastructure/adapter/persistence/prisma/repository/post/prisma.post.repository';
import { GetAllCommentService } from '@core/service/comment/usecase/get-all-comment.service';

export const persistenceCommentProvider: Provider[] = [
  {
    provide: CommentDITokens.CommentReadRepository,
    useFactory: (prismaService: PrismaService) => new PrismaCommentRepository(prismaService),
    inject: [PrismaToken],
  },
  {
    provide: PostDITokens.PostWriteRepository,
    useFactory: (prismaService: PrismaService) => new PrismaPostRepository(prismaService),
    inject: [PrismaToken],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: CommentDITokens.CreateCommentUseCase,
    useFactory: (postRepository, commentRepository, queryBus) => {
      const service: CreateCommentUseCase = new CreateCommentService(postRepository, commentRepository, queryBus);
      return service;
    },
    inject: [PostDITokens.PostWriteRepository, CommentDITokens.CommentReadRepository, CoreDITokens.QueryBus],
  },
  {
    provide: CommentDITokens.GetAllCommentListUseCase,
    useFactory: (commentRepository) => {
      const service: GetAllCommentUseCase = new GetAllCommentService(commentRepository);
      return service;
    },
    inject: [CommentDITokens.CommentReadRepository],
  },
];

@Module({
  providers: [...useCaseProviders, ...persistenceCommentProvider],
  exports: [...persistenceCommentProvider, ...useCaseProviders],
})
export class CommentModule {}
