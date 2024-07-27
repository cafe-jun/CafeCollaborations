import { Injectable } from '@nestjs/common';

import { CoreAssert } from '@core/common/util/assert/core.assert';
import { Exception } from '@core/common/exception/Exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { GetPostUseCase } from '@core/domain/post/usecase/post.usecase';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { Post } from '@core/domain/post/entity/post';
import { GetPostPort } from '@core/domain/post/port/usecase/post.port';

@Injectable()
export class GetPostService implements GetPostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  async execute(usecasePort: GetPostPort): Promise<PostUseCaseDto> {
    const post: Post = CoreAssert.notEmpty(
      await this.postRepository.findPostById({ id: usecasePort.postId }),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR.getDescription(), overrideMessage: 'Post not found.' }),
    );

    const hasAccess: boolean =
      post.getStatus() === PostStatus.PUBLISHED || (usecasePort.executorId === post.getOwner().getId() && post.getStatus() === PostStatus.DRAFT);

    CoreAssert.isTrue(hasAccess, Exception.create({ code: CommonMsg.ACCESS_DENIED_ERROR }));
    return PostUseCaseDto.newFromPost(post);
  }
}
