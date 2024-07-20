import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { GetPostListPort, GetPostPort } from '@core/domain/post/port/usecase/post.port';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

@Exclude()
export class GetPostListAdapter extends UseCaseValidateAdapter implements GetPostListPort {
  @Expose()
  @IsNumber()
  public executorId: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public status?: PostStatus;

  @Expose()
  @IsOptional()
  @IsNumber()
  public ownerId?: number;

  public static async create(payload: GetPostListPort): Promise<GetPostListAdapter> {
    const adapter: GetPostListAdapter = plainToInstance(GetPostListAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
