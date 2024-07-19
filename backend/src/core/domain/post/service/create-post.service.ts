import { CoreAssert } from '@core/common/util/assert/core.assert';
import { CreatePostPort } from '../port/usecase/post.port';
import { PostUseCaseDto } from '../usecase/dto/post-usecase.dto';
import { CreatePostUseCase } from '../usecase/post.usecase';
import { PostRepositoryPort } from '../port/persistence/post.repository.port';
import { QueryBusPort } from '@core/common/port/message/query-bus.port';
import { Exception } from '@core/common/exception/exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { GetUserPreviewQuery } from './../../../common/message/query/queries/user/get-user-preview.query';
import { Post } from '../entity/post';
import { PostOwner } from '../entity/post-owner';
import { GetUserPreviewQueryResult } from '@core/common/message/query/queries/user/result/get-user-preview-query.result';

export class CreatePostService implements CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepositoryPort,
    private readonly queryBus: QueryBusPort,
  ) {}
  public async execute(usecasePort: CreatePostPort): Promise<PostUseCaseDto> {
    const postOwner: GetUserPreviewQueryResult = CoreAssert.notEmpty(
      await this.queryBus.sendQuery(GetUserPreviewQuery),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Post Owner not Found' }),
    );

    const post: Post = await Post.create({
      owner: await PostOwner.create(postOwner.id, postOwner.name),
      title: usecasePort.title,
      content: usecasePort.content,
    });
    await this.postRepository.addPost(post);
    return PostUseCaseDto.newFromPost(post);
  }
}
