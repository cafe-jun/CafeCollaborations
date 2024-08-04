import { PostDITokens } from '@core/domain/post/di/post-di.token';
import { PrismaPostRepository } from '@infrastructure/adapter/persistence/prisma/repository/post/prisma.post.repository';
import { Module, Provider } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ElasticToken, PrismaToken } from './infrastructure.module';
import { CreatePostUseCase, RemovePostUseCase } from '@core/domain/post/usecase/post.usecase';
import { TransactionalUseCaseWrapper } from '@infrastructure/transaction/transactional-usecase.wrapper';
import { PostController } from '@presentation/post.controller';
import { CoreDITokens } from '@core/common/di/core-di.token';
import { PublishPostUseCase } from './../core/domain/post/usecase/post.usecase';
import { CreatePostService } from '@core/service/post/usecase/create-post.service';
import { EditPostService } from '@core/service/post/usecase/edit-post.service';
import { GetPostDetailService } from '@core/service/post/usecase/detail-post.service';
import { PublishPostService } from '@core/service/post/usecase/publish-post.service';
import { RemovePostService } from '@core/service/post/usecase/remove-post.service';
import { GetAllPostListService } from '@core/service/post/usecase/get-all-post.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticPostRepository } from '@infrastructure/adapter/persistence/elasticsearch/post/elastic-post.adpater';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';

export const persistencePostProvider: Provider[] = [
  {
    provide: PostDITokens.PostReadRepository,
    useFactory: (elasticService: ElasticsearchService) => new ElasticPostRepository(elasticService),
    inject: [ElasticToken],
  },
  {
    provide: PostDITokens.PostWriteRepository,
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
    inject: [PostDITokens.PostWriteRepository, CoreDITokens.QueryBus],
  },
  {
    provide: PostDITokens.EditPostUseCase,
    useFactory: (postRepository, queryBus) => {
      const service: EditPostService = new EditPostService(postRepository, queryBus);
      return new TransactionalUseCaseWrapper(service);
    },
    inject: [PostDITokens.PostWriteRepository, CoreDITokens.QueryBus],
  },
  {
    provide: PostDITokens.GetPostDetailUseCase,
    useFactory: (postRepository) => new GetPostDetailService(postRepository),
    inject: [PostDITokens.PostReadRepository],
  },
  {
    provide: PostDITokens.PublishPostUseCase,
    useFactory: (postRepository) => {
      const service: PublishPostUseCase = new PublishPostService(postRepository);
      return new TransactionalUseCaseWrapper(service);
    },
    inject: [PostDITokens.PostWriteRepository],
  },
  {
    provide: PostDITokens.RemovePostUseCase,
    useFactory: (postRepository) => {
      const service: RemovePostUseCase = new RemovePostService(postRepository);
      return new TransactionalUseCaseWrapper(service);
    },
    inject: [PostDITokens.PostWriteRepository],
  },
  {
    provide: PostDITokens.GetAllPostListUseCase,
    useFactory: (postRepository) => new GetAllPostListService(postRepository),
    inject: [PostDITokens.PostReadRepository, PostDITokens.PostWriteRepository],
  },
];

@Module({
  providers: [...persistencePostProvider, ...useCaseProviders],
  controllers: [PostController],
  exports: [...persistencePostProvider],
})
export class PostModule {}
