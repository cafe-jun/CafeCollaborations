import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { PublishPostPort } from '@core/domain/post/port/usecase/post.port';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsNumber } from 'class-validator';

@Exclude()
export class PublishPostAdapter extends UseCaseValidateAdapter implements PublishPostPort {
  @Expose()
  @IsNumber()
  postId: number;

  @Expose()
  @IsNumber()
  executorId: number;

  public static async create(payload: PublishPostPort): Promise<PublishPostAdapter> {
    const adapter: PublishPostAdapter = plainToInstance(PublishPostAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
