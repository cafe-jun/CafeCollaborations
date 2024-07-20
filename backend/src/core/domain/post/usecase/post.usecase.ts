import { TransactionalUseCase } from '@core/common/usecase/transaction.usecase';
import { CreatePostPort, EditPostPort, GetPostListPort, GetPostPort, PublishPostPort, RemovePostPort } from '../port/usecase/post.port';
import { PostUseCaseDto } from './dto/post-usecase.dto';
import { UseCase } from '@core/common/usecase/usecase';

export interface CreatePostUseCase extends TransactionalUseCase<CreatePostPort, PostUseCaseDto> {}

export interface EditPostUseCase extends TransactionalUseCase<EditPostPort, PostUseCaseDto> {}

export interface GetPostListUseCase extends UseCase<GetPostListPort, PostUseCaseDto[]> {}

export interface GetPostUseCase extends UseCase<GetPostPort, PostUseCaseDto> {}

export interface PublishPostUseCase extends UseCase<PublishPostPort, PostUseCaseDto> {}

export interface RemovePostUseCase extends UseCase<RemovePostPort, PostUseCaseDto> {}
