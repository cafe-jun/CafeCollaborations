import { UseCase } from '@core/common/usecase/usecase';
import { CreateUserPort } from '../port/persistence/create-user.port';
import { UserUseCaseDto } from './dto/user.usecase.dto';
import { GetUserPort } from '../port/usecase/user.port';

export interface CreateUserUseCase extends UseCase<CreateUserPort, UserUseCaseDto> {}

export interface GetUserUseCase extends UseCase<GetUserPort, UserUseCaseDto> {}
