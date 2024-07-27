import { PublishPostAdapter } from '@infrastructure/adapter/usecase/post/publish-post.adapter';

import { CoreAssert } from '@core/common/util/assert/core.assert';

import { Exception } from '@core/common/exception/exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { PublishPostPort } from '@core/domain/post/port/usecase/post.port';
import { Post } from '@core/domain/post/entity/post';
import { PublishPostUseCase } from '@core/domain/post/usecase/post.usecase';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';

export class PublishPostService implements PublishPostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}
  public async execute(payload: PublishPostPort): Promise<PostUseCaseDto> {
    const post: Post = CoreAssert.notEmpty(
      await this.postRepository.findPostById({ id: payload.postId }),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR.getDescription(), overrideMessage: 'Post not found' }),
    );
    const hasAccess: boolean = payload.executorId === post.getOwner().getId();
    CoreAssert.isTrue(hasAccess, Exception.create({ code: CommonMsg.ACCESS_DENIED_ERROR.getDescription() }));

    await post.publish();

    await this.postRepository.updatePost(post);
    return PostUseCaseDto.newFromPost(post);
  }
}
