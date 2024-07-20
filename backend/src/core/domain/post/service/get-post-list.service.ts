import { Post } from '../entity/post';
import { PostRepositoryPort } from '../port/persistence/post.repository.port';
import { GetPostListPort } from '../port/usecase/post.port';
import { PostUseCaseDto } from '../usecase/dto/post-usecase.dto';
import { GetPostListUseCase } from '../usecase/post.usecase';

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
