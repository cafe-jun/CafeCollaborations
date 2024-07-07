import { UseCase } from '@core/common/usecase/usecase';
import { CreateUserPort } from '../port/persistence/create-user.port';
import { UserUseCaseDto } from './dto/user.usecase.dto';

export interface CreateUserUseCase extends UseCase<CreateUserPort, UserUseCaseDto> {}
