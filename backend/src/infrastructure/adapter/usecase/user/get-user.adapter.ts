import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { GetUserPort } from '@core/domain/user/port/usecase/user.port';
import { plainToClass, plainToInstance } from 'class-transformer';

export class GetUserAdapter extends UseCaseValidateAdapter implements GetUserPort {
  userId: number;

  public static async create(payload: GetUserPort): Promise<GetUserAdapter> {
    const adapter: GetUserAdapter = plainToInstance(GetUserAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
