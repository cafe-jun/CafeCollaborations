import { CoreAssert } from '@core/common/util/assert/core.assert';
import { PostUseCaseDto } from '../usecase/dto/post-usecase.dto';
import { PostRepositoryPort } from '../port/persistence/post.repository.port';
import { QueryBusPort } from '@core/common/port/message/query-bus.port';
import { Exception } from '@core/common/exception/exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { Post } from '../entity/post';
import { EditPostPort } from '../port/usecase/post.port';
import { EditPostUseCase } from '../usecase/post.usecase';

export class EditPostService implements EditPostUseCase {
  constructor(
    private readonly postRepository: PostRepositoryPort,
    private readonly queryBus: QueryBusPort,
  ) {}
  public async execute(usecasePort: EditPostPort): Promise<PostUseCaseDto> {
    const post: Post = CoreAssert.notEmpty(
      await this.postRepository.findPostById({ id: usecasePort.postId }),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR.getDescription(), overrideMessage: 'Post not found.' }),
    );

    const hasAccess: boolean = usecasePort.executorId === post.getOwner().getId();
    CoreAssert.isTrue(hasAccess, Exception.create({ code: CommonMsg.ACCESS_DENIED_ERROR }));

    await post.edit({
      title: usecasePort.title,
      content: usecasePort.content,
    });

    await this.postRepository.updatePost(post);
    return PostUseCaseDto.newFromPost(post);
  }
}
