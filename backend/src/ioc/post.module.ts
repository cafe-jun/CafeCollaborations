import { PostDITokens } from '@core/domain/post/di/post-di.token';
import { PrismaPostRepository } from '@infrastructure/adapter/persistence/prisma/repository/post/prisma.post.repository';
import { Module, Provider } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaToken } from './infrastructure.module';
import { CreatePostUseCase, GetAllPostUseCase, RemovePostUseCase } from '@core/domain/post/usecase/post.usecase';
import { TransactionalUseCaseWrapper } from '@infrastructure/transaction/transactional-usecase.wrapper';
import { PostController } from '@presentation/post.controller';
import { CoreDITokens } from '@core/common/di/core-di.token';
import { PublishPostUseCase } from './../core/domain/post/usecase/post.usecase';
import { CreatePostService } from '@core/service/post/usecase/create-post.service';
import { EditPostService } from '@core/service/post/usecase/edit-post.service';
import { GetPostService } from '@core/service/post/usecase/get-post.service';
import { GetPostListService } from '@core/service/post/usecase/get-post-list.service';
import { PublishPostService } from '@core/service/post/usecase/publish-post.service';
import { RemovePostService } from '@core/service/post/usecase/remove-post.service';
import { GetAllPostListService } from '@core/service/post/usecase/get-all-post.service';

const persistencePostProvider: Provider[] = [
  {
    provide: PostDITokens.PostRepository,
    useFactory: (prismaService: PrismaService) => new PrismaPostRepository(prismaService),
    inject: [PrismaToken],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: PostDITokens.CreatePostUseCase,
    useFactory: (postRepository, queryBus) => {
      const service: CreatePostUseCase = new CreatePostService(postRepository, queryBus);
      return new TransactionalUseCaseWrapper(service);
    },
    inject: [PostDITokens.PostRepository, CoreDITokens.QueryBus],
  },
  {
    provide: PostDITokens.EditPostUseCase,
    useFactory: (postRepository, queryBus) => {
      const service: EditPostService = new EditPostService(postRepository, queryBus);
      return new TransactionalUseCaseWrapper(service);
    },
    inject: [PostDITokens.PostRepository, CoreDITokens.QueryBus],
  },
  {
    provide: PostDITokens.GetPostUseCase,
    useFactory: (postRepository) => new GetPostService(postRepository),
    inject: [PostDITokens.PostRepository],
  },
  {
    provide: PostDITokens.GetPostListUseCase,
    useFactory: (postRepository) => new GetPostListService(postRepository),
    inject: [PostDITokens.PostRepository],
  },
  {
    provide: PostDITokens.PublishPostUseCase,
    useFactory: (postRepository) => {
      const service: PublishPostUseCase = new PublishPostService(postRepository);
      return new TransactionalUseCaseWrapper(service);
    },
    inject: [PostDITokens.PostRepository],
  },
  {
    provide: PostDITokens.RemovePostUseCase,
    useFactory: (postRepository) => {
      const service: RemovePostUseCase = new RemovePostService(postRepository);
      return new TransactionalUseCaseWrapper(service);
    },
  },
  {
    provide: PostDITokens.GetAllPostListUseCase,
    useFactory: (postRepository) => new GetAllPostListService(postRepository),
    inject: [PostDITokens.PostRepository],
  },
];

@Module({
  providers: [...persistencePostProvider, ...useCaseProviders],
  controllers: [PostController],
})
export class PostModule {}
