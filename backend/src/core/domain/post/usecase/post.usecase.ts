import { TransactionalUseCase } from '@core/common/usecase/transaction.usecase';
import {
  CreatePostPort,
  EditPostPort,
  GetAllPostListPort,
  GetPostDetailPort,
  GetPostListPort,
  PublishPostPort,
  RemovePostPort,
} from '../port/usecase/post.port';
import { PostUseCaseDto } from './dto/post-usecase.dto';
import { UseCase } from '@core/common/usecase/usecase';
import { PaginationResponse } from '@core/common/pagination/pagination.response';

export interface CreatePostUseCase extends TransactionalUseCase<CreatePostPort, { id: number }> {}

export interface EditPostUseCase extends TransactionalUseCase<EditPostPort, PostUseCaseDto> {}

export interface GetPostListUseCase extends UseCase<GetPostListPort, PostUseCaseDto[]> {}

export interface GetPostDetailUseCase extends UseCase<GetPostDetailPort, PostUseCaseDto> {}

export interface PublishPostUseCase extends UseCase<PublishPostPort, PostUseCaseDto> {}

export interface RemovePostUseCase extends UseCase<RemovePostPort, void> {}

export interface GetAllPostUseCase extends UseCase<GetAllPostListPort, PaginationResponse<PostUseCaseDto>> {}

export interface SearchPostUseCase extends UseCase<void, void> {}
