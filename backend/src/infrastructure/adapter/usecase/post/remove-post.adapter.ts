import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { RemovePostPort } from '@core/domain/post/port/usecase/post.port';
import { plainToInstance } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class RemovePostAdapter extends UseCaseValidateAdapter implements RemovePostPort {
  @IsNumber()
  executorId: number;

  @IsNumber()
  postId: number;

  public static async create(payload: RemovePostPort): Promise<RemovePostAdapter> {
    const adapater: RemovePostAdapter = plainToInstance(RemovePostAdapter, payload);
    await adapater.validate();
    return adapater;
  }
}
