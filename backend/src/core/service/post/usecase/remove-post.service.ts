import { Exception } from '@core/common/exception/exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { Post } from '@core/domain/post/entity/post';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { RemovePostPort } from '@core/domain/post/port/usecase/post.port';
import { RemovePostUseCase } from '@core/domain/post/usecase/post.usecase';

export class RemovePostService implements RemovePostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}
  async execute(payload: RemovePostPort): Promise<void> {
    const post: Post = CoreAssert.notEmpty(
      await this.postRepository.findPostById({ id: payload.postId }),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR.getDescription(), overrideMessage: 'Post not found.' }),
    );
    const hasAccess: boolean = post.getOwner().getId() === payload.executorId;
    CoreAssert.isTrue(hasAccess, Exception.create({ code: CommonMsg.ACCESS_DENIED_ERROR }));
    await this.postRepository.removePost(post);
  }
}
