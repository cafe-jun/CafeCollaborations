import { Injectable } from '@nestjs/common';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { Exception } from '@core/common/exception/Exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { GetPostDetailUseCase } from '@core/domain/post/usecase/post.usecase';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { Post } from '@core/domain/post/entity/post';
import { GetPostDetailPort } from '@core/domain/post/port/usecase/post.port';

@Injectable()
export class GetPostDetailService implements GetPostDetailUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  async execute(payload: GetPostDetailPort): Promise<PostUseCaseDto> {
    const post: Post = CoreAssert.notEmpty(
      await this.postRepository.findPostById({ id: payload.postId }),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR.getDescription(), overrideMessage: 'Post not found.' }),
    );

    return PostUseCaseDto.newFromPost(post);
  }
}
