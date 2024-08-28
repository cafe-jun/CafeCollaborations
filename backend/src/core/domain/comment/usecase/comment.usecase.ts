import { TransactionalUseCase } from '@core/common/usecase/transaction.usecase';
import { CreateCommentPort } from '../port/comment.port';

export interface CreateCommentUseCase extends TransactionalUseCase<CreateCommentPort, { id: number }> {}
