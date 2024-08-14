import { CoreAssert } from '@core/common/util/assert/core.assert';

import { QueryBusPort } from '@core/common/port/message/query-bus.port';
import { Exception } from '@core/common/exception/exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { GetUserPreviewQuery } from './../../../common/message/query/queries/user/get-user-preview.query';

import { GetUserPreviewQueryResult } from '@core/common/message/query/queries/user/result/get-user-preview-query.result';
import { CreatePostPort } from '@core/domain/post/port/usecase/post.port';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { CreatePostUseCase } from '@core/domain/post/usecase/post.usecase';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { PostOwner } from '@core/domain/post/entity/post-owner';
import { Post } from '@core/domain/post/entity/post';

export class CreatePostService implements CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepositoryPort,
    private readonly queryBus: QueryBusPort,
  ) {}
  public async execute(payload: CreatePostPort): Promise<PostUseCaseDto> {
    const postOwner: GetUserPreviewQueryResult = CoreAssert.notEmpty(
      await this.queryBus.sendQuery(GetUserPreviewQuery.create({ id: payload.executorId })),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Post Owner not Found' }),
    );

    const post: Post = await Post.create({
      owner: await PostOwner.create(postOwner.id, postOwner.name),
      title: payload.title,
      content: payload.content,
      region: payload.region,
      status: payload.status,
      category: payload.category,
      durationType: payload.durationType,
      recruitMember: payload.recruitMember,
      publishedAt: payload.publishedAt,
      createdAt: payload.createdAt,
      editedAt: payload.editedAt,
    });
    console.log(post);
    await this.postRepository.addPost(post);
    return PostUseCaseDto.newFromPost(post);
  }
}
