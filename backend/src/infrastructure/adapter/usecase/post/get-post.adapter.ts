import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { GetPostPort } from '@core/domain/post/port/usecase/post.port';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsNumber } from 'class-validator';

@Exclude()
export class GetPostAdapter extends UseCaseValidateAdapter implements GetPostPort {
  @Expose()
  @IsNumber()
  postId: number;

  @Expose()
  @IsNumber()
  executorId: number;

  public static async create(payload: GetPostPort): Promise<GetPostAdapter> {
    const adapter: GetPostAdapter = plainToInstance(GetPostAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
