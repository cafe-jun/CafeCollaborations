import { PaginationResponse } from '@core/common/pagination/pagination.response';
import { GetAllCommentPort } from '@core/domain/comment/port/comment.port';
import { CommentRepositoryPort } from '@core/domain/comment/port/persistence/comment.repository.port';
import { GetAllCommentUseCase } from '@core/domain/comment/usecase/comment.usecase';
import { CommentUseCaseDto } from '@core/domain/comment/usecase/dto/comment-usecase.dto';

export class GetAllCommentService implements GetAllCommentUseCase {
  constructor(private readonly commentRepository: CommentRepositoryPort) {}

  async execute(payload: GetAllCommentPort): Promise<PaginationResponse<CommentUseCaseDto>> {
    const { items, totalCount } = await this.commentRepository.findComments(payload.postId, { pageNo: payload.pageNo, pageSize: payload.pageSize });

    const response = new PaginationResponse<CommentUseCaseDto>({
      pageSize: payload.pageSize,
      items: CommentUseCaseDto.newListFromComments(items),
      totalCount: totalCount,
    });

    return response;
  }
}
