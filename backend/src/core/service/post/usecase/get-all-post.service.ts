import { Post } from '@core/domain/post/entity/post';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { GetAllPostListPort } from '@core/domain/post/port/usecase/post.port';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { GetAllPostUseCase } from '@core/domain/post/usecase/post.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllPostListService implements GetAllPostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  async execute(
    payload: GetAllPostListPort,
  ): Promise<{ items: PostUseCaseDto[]; totalCount: number; pageCount: number; pageSize: number; pageNo: number }> {
    const { items, totalCount } = await this.postRepository.findPostByPagination({
      pageNo: payload.pageNo,
      pageSize: payload.pageSize,
    });
    const posts = PostUseCaseDto.newListFromPosts(items);
    const pageCount = Math.ceil(totalCount / payload.pageSize);

    return { items: posts, totalCount, pageCount, pageSize: payload.pageSize, pageNo: payload.pageNo };
  }
}
