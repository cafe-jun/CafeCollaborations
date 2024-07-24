import { PublishPostAdapter } from '@infrastructure/adapter/usecase/post/publish-post.adapter';
import { PublishPostUseCase } from '../usecase/post.usecase';
import { PostUseCaseDto } from '../usecase/dto/post-usecase.dto';
import { Post } from '../entity/post';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { PostRepositoryPort } from '../port/persistence/post.repository.port';
import { PublishPostPort } from '../port/usecase/post.port';
import { Exception } from '@core/common/exception/exception';
import { CommonMsg } from '@core/common/response/message/common-message';

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
