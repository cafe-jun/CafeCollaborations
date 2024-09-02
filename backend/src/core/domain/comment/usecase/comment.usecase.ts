import { TransactionalUseCase } from '@core/common/usecase/transaction.usecase';
import { CreateCommentPort, GetAllCommentPort } from '../port/comment.port';
import { UseCase } from '@core/common/usecase/usecase';
import { CommentUseCaseDto } from './dto/comment-usecase.dto';
import { PaginationResponse } from '@core/common/pagination/pagination.response';

export interface CreateCommentUseCase extends TransactionalUseCase<CreateCommentPort, { id: number }> {}

export interface GetAllCommentUseCase extends UseCase<GetAllCommentPort, PaginationResponse<CommentUseCaseDto>> {}
