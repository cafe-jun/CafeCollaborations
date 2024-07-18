import { CoreAssert } from '@core/common/util/assert/core.assert';
import { PostRepositoryPort } from '../port/persistence/post.repository.port';
import { CreatePostPort } from '../port/usecase/post.port';
import { PostUseCaseDto } from '../usecase/dto/post-usecase.dto';
import { CreatePostUseCase } from '../usecase/post.usecase';
import { Post } from '../entity/post';
import { PostOwner } from '../entity/post-owner';
import { PostImage } from '../entity/post-image';
import { Exception } from '@core/common/exception/exception';
import { QueryBusPort } from '@core/common/port/message/query-bus.port';
import { GetUserPreviewQuery } from '@core/common/message/query/queries/user/get-user-preview.query';

export class CreatePostService implements CreatePostUseCase {
  constructor(
    private readonly postRepositoryPort: PostRepositoryPort,
    private readonly queryBus: QueryBusPort,
  ) {}
  async execute(usecasePort: CreatePostPort): Promise<PostUseCaseDto> {
    const postOwner: PostOwner = CoreAssert.notEmpty(
      await this.queryBus.sendQuery(GetUserPreviewQuery.create({ id: usecasePort.executorId })),
      Exception.throw({ code: 2134, overrideMessage: 'PostOwner not Found' }),
    );

    const post: Post = await Post.create({
      owner: await PostOwner.create(postOwner.getId(), postOwner.getName()),
      // image: postImage ? await PostImage.create(postImage.getId(), postImage.getRelativePath()) : null,
      title: usecasePort.title,
      content: usecasePort.content,
    });
    await this.postRepositoryPort.addPost(post);
    return PostUseCaseDto.newFromPost(post);
  }
}
