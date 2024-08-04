import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { GetPostDetailPort } from '@core/domain/post/port/usecase/post.port';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsNumber } from 'class-validator';

@Exclude()
export class GetPostAdapter extends UseCaseValidateAdapter implements GetPostDetailPort {
  @Expose()
  @IsNumber()
  postId: number;

  public static async create(payload: GetPostDetailPort): Promise<GetPostAdapter> {
    const adapter: GetPostAdapter = plainToInstance(GetPostAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
