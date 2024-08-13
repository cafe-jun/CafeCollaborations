import { TransactionalUseCase } from '@core/common/usecase/transaction.usecase';
import { UseCase } from '@core/common/usecase/usecase';
import { Transactional } from '@nestjs-cls/transactional';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionalUseCaseWrapper<TUseCasePort, TUseCaseResult> implements UseCase<TUseCasePort, TUseCaseResult> {
  constructor(private readonly usecase: TransactionalUseCase<TUseCasePort, TUseCaseResult>) {}

  @Transactional()
  async execute(port: TUseCasePort): Promise<TUseCaseResult> {
    const result: TUseCaseResult = await this.usecase.execute(port);
    return result;
  }
}
