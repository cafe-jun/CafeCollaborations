import { QueryBusPort } from '@core/common/port/message/query-bus.port';
import { CreatePostPort } from '@core/domain/post/port/usecase/post.port';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { CreateCommentUseCase } from '@core/domain/comment/usecase/comment.usecase';
import { CreateCommentPort } from '@core/domain/comment/port/comment.port';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { Exception } from '@core/common/exception/exception';
import { CommonMsg } from '@core/common/response/message/common-message';

export class CreateCommentService implements CreateCommentUseCase {
  constructor(
    //preview 만들기
    private readonly postRepository: PostRepositoryPort,
    private readonly queryBus: QueryBusPort,
  ) {}

  async execute(payload: CreateCommentPort): Promise<{ id: number }> {
    const post = CoreAssert.isEmpty(
      await this.postRepository.findPostById({ id: payload.postId }),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'PostId not Found' }),
    );
    return { id: 1 };
  }
}
