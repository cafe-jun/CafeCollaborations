import { PaginationResponse } from '@core/common/pagination/pagination.response';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { GetAllPostListPort } from '@core/domain/post/port/usecase/post.port';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { GetAllPostUseCase } from '@core/domain/post/usecase/post.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllPostListService implements GetAllPostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  async execute(payload: GetAllPostListPort): Promise<PaginationResponse<PostUseCaseDto>> {
    const { items, totalCount } = await this.postRepository.findPosts(
      { pageNo: payload.pageNo, pageSize: payload.pageSize },
      { keyword: payload.keyword },
    );
    console.log(items);
    const posts = PostUseCaseDto.newListFromPosts(items);
    const response = new PaginationResponse<PostUseCaseDto>({
      pageSize: payload.pageSize,
      items: posts,
      totalCount: totalCount,
    });
    return response;
  }
}
