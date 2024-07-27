import { Post } from '@core/domain/post/entity/post';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { GetPostListPort } from '@core/domain/post/port/usecase/post.port';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { GetPostListUseCase } from '@core/domain/post/usecase/post.usecase';

export class GetPostListService implements GetPostListUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}
  async execute(usecasePort: GetPostListPort): Promise<PostUseCaseDto[]> {
    const posts: Post[] = await this.postRepository.findPosts({
      ownerId: usecasePort.ownerId,
      status: usecasePort.status,
    });
    return PostUseCaseDto.newListFromPosts(posts);
  }
}
