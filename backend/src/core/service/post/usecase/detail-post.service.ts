import { Injectable } from '@nestjs/common';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { Exception } from '@core/common/exception/Exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { GetPostDetailUseCase } from '@core/domain/post/usecase/post.usecase';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { Post } from '@core/domain/post/entity/post';
import { GetPostDetailPort } from '@core/domain/post/port/usecase/post.port';
import { isEmpty } from '@shared/data.helper';

@Injectable()
export class GetPostDetailService implements GetPostDetailUseCase {
  constructor(
    private readonly postSearchRepository: PostRepositoryPort,
    private readonly postWriteRepository: PostRepositoryPort,
  ) {}

  async execute(payload: GetPostDetailPort): Promise<PostUseCaseDto> {
    const searchPost: Post = await this.postSearchRepository.findPostById({ id: payload.postId });
    if (isEmpty(searchPost)) {
      const originPost: Post = CoreAssert.isEmpty(
        await this.postWriteRepository.findPostById({ id: payload.postId }),
        Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR.getDescription(), overrideMessage: 'Post not found.' }),
      );
      return PostUseCaseDto.newFromPost(originPost);
    }
    return PostUseCaseDto.newFromPost(searchPost);
  }
}
